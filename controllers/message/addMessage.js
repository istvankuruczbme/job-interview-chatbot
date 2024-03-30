import Chat from "../../models/Chat.js";
import Message from "../../models/Message.js";

// Function to add a message to a chat
export default async function addMessage(req, reply) {
	// Get the parameters from the request body
	const { role, content, totalTokens, timestamp, chatId } = req.body;

	// Find the chat with the given chatId
	try {
		const chat = await Chat.findById(chatId);
		if (!chat) {
			console.log("Chat not found");
			return null;
		}
	} catch (e) {
		console.log("Error finding chat:\n", e);
		return null;
	}

	// Create the message with the given parameters
	const message = new Message({ role, content, totalTokens, timestamp, chatId });
	try {
		// Save the chat to the DB
		await message.save();
		return message;
	} catch (e) {
		console.log("Error adding message:\n", e);
		return null;
	}
}
