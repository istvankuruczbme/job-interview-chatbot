import Chat from "../../models/Chat.js";
import Message from "../../models/Message.js";
import checkValidChatId from "../../utils/checkValidChatId.js";

// Function that deletes a chat
export default async function deleteChat(req, reply) {
	// Extract chatId from the request parameters
	const { chatId } = req.params;

	// Check if chatId is provided
	if (!chatId) {
		console.log("Chat ID is required");
		return null;
	}

	// Check if the chat exists
	const validChat = await checkValidChatId(chatId);
	if (!validChat) {
		console.log("Chat not found");
		return null;
	}

	try {
		// First delete the messages of the chat
		await Message.deleteMany({ chatId: chatId });

		// Delete the chat
		await Chat.deleteOne({ _id: chatId });
		return "Chat deleted successfully";
	} catch (e) {
		console.log("Error finding the chat:\n", e);
		return null;
	}
}
