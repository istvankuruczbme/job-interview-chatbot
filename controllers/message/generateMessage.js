import Chat from "../../models/Chat.js";
import { fastify, openai } from "../../server.js";
import checkValidChatId from "../../utils/checkValidChatId.js";

function createPromptText(prompt) {
	let promptText = "";
	if (prompt.type === "PROFESSIONAL_QUESTION") {
		// Replace the placholders with the actual values
		promptText = fastify.config.CHAT_GPT_USER_PROMPT_TEMPLATE.replace("<LEVEL>", prompt.level);
		promptText = promptText.replace("<POSITION>", prompt.position);
	} else if (prompt.type === "GENERAL_QUESTION") {
		promptText = prompt.content;
	}

	return promptText;
}

// Function that generates a message based on the user's prompt with ChatGPT
export default async function generateMessage(req, reply, done) {
	// Extract the prompt from the request body
	const { prompt, timestamp, chatId } = req.body;

	// Check if the chatId is provided
	if (!chatId) {
		console.log("Chat ID not provided.");
		return null;
	}

	try {
		// Get the chat from the DB
		const chat = await Chat.findById(chatId);
		if (!chat) {
			console.log("Chat not found.");
			return null;
		}

		// Create the prompt text
		prompt.position = chat.position;
		const promptText = createPromptText(prompt);

		// Generate the completion from the OpenAI API
		const completion = await openai.chat.completions.create({
			messages: [
				{ role: "system", content: fastify.config.CHAT_GPT_SYSTEM_PROMPT },
				{ role: "user", content: promptText },
			],
			model: "gpt-3.5-turbo-0125",
		});

		// Create the structure for the messages and add them to the request
		req.messages = [
			{
				role: "user",
				content: promptText,
				timestamp,
				tokens: completion.usage.prompt_tokens,
				chatId,
			},
			{
				role: "assistant",
				content: completion.choices[0].message.content,
				timestamp: new Date(),
				tokens: completion.usage.completion_tokens,
				chatId,
			},
		];

		done();
	} catch (e) {
		console.log("Error getting the answer from OpenAI API: ", e);
		return null;
	}
}
