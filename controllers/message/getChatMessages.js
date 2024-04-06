import Message from "../../models/Message.js";
import checkValidChatId from "../../utils/checkValidChatId.js";

// Function to get all messages in a chat
export default async function getChatMessages(req, reply) {
	// Get the chatId from the request query
	const { chatId, limit } = req.query;

	// Check if there is a chatId in the request
	if (!chatId) {
		console.log("No chatId provided");
		return null;
	}

	// Check if the chatId is valid
	const validId = await checkValidChatId(chatId);
	if (!validId) {
		console.log("Invalid chatId");
		return null;
	}

	// Check if there is a limit in the request
	if (!limit) limit = 10;

	// Find the messages with the given chatId
	try {
		// const messages = await Message.find({ chatId }).sort({ timestamp: "asc" }).limit(limit);
		const messages = await Message.find({ chatId }).sort({ timestamp: "asc" });
		return messages;
	} catch (e) {
		console.log("Error finding messages:\n", e);
		return null;
	}
}
