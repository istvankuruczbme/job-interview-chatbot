import Chat from "../../models/Chat.js";
import Message from "../../models/Message.js";
import { fastify, openai } from "../../server.js";

function createPromptText(prompt, position) {
	let promptText = "";
	if (prompt.type === "PROFESSIONAL_QUESTION") {
		// Replace the placholders with the actual values
		promptText = fastify.config.CHAT_GPT_USER_PROMPT_TEMPLATE.replace("<LEVEL>", prompt.level);
		promptText = promptText.replace("<POSITION>", position);
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
	if (!chatId) throw new Error("chat/id-not-provided");

	try {
		// Get the chat from the DB
		const chat = await Chat.findById(chatId);
		if (!chat) throw new Error("chat/not-found");

		if (prompt) {
			// Create the prompt text
			const promptText = createPromptText(prompt, chat.position);

			// Get the last 6 messages for chat history
			const prevMessages = await Message.find({ chatId }).sort({ timestamp: "desc" }).limit(6);

			// Generate the completion from the OpenAI API
			const completion = await openai.chat.completions.create({
				messages: [
					{ role: "system", content: fastify.config.CHAT_GPT_SYSTEM_PROMPT.replace("<POSITION>", chat.position) },
					...prevMessages.toReversed().map((message) => ({ role: message.role, content: message.content })),
					{ role: "user", content: promptText },
				],
				model: "gpt-3.5-turbo-0125",
				temperature: 0.2,
			});

			// Create the structure for the messages and add them to the request
			req.messages = [
				{
					role: "user",
					content: prompt.type === "PROFESSIONAL_QUESTION" ? promptText.split("\n")[0] : promptText,
					timestamp,
					tokens: completion.usage.prompt_tokens,
					chatId,
				},
				{
					role: "assistant",
					content:
						prompt.type === "PROFESSIONAL_QUESTION"
							? completion.choices[0].message.content
									.replace("<QUESTION>: ", "Question:\n")
									.replace("<ANSWER>: ", "\nThe answer can be something like:\n")
							: completion.choices[0].message.content,
					timestamp: new Date(),
					tokens: completion.usage.completion_tokens,
					chatId,
				},
			];
		} else {
			// It the body doesn't have prompt then it will be the first message of the chat
			req.messages = [
				{
					role: "assistant",
					content:
						"Hello!\nHow can I help you today?\nClick on the button below to see a typical question for your position or simply type in your question.",
					tokens: 0,
					timestamp: new Date(),
					chatId,
				},
			];
		}
	} catch (e) {
		console.log("Error getting the answer from OpenAI API: ", e);
		return null;
	}
}
