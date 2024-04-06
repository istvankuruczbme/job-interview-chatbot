import Chat from "../../models/Chat.js";

export default async function getChat(req, reply) {
	// Get chatId from the request parameters
	const { chatId } = req.params;

	// Check if chatId is provided
	if (!chatId) {
		console.log("Chat ID not provided.");
		return null;
	}

	try {
		// Find the chat in the DB
		const chat = await Chat.findById(chatId);

		return chat;
	} catch (e) {
		console.log("Error fetching chat:\n", e);
		return null;
	}
}
