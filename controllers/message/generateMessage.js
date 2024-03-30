import { openai } from "../../server.js";

// Function that generates a message based on the user's prompt with ChatGPT
export default async function generateMessage(req, reply) {
	// Extract the prompt from the request body
	const { prompt } = req.body;

	// Check if the prompt is provided
	if (!prompt) {
		console.log("Prompt not provided");
		return null;
	}

	try {
		const completion = await openai.chat.completions.create({
			messages: [
				{ role: "system", content: "You are a chatbot who helpes to prepare for job interviews." },
				{ role: "user", content: prompt },
			],
			model: "gpt-3.5-turbo-0125",
		});

		return completion.choices;
	} catch (e) {
		console.log("Error getting the answer from OpenAI API: ", e);
		return null;
	}
}
