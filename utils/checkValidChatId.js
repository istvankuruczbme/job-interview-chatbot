import mongoose from "mongoose";
import Chat from "../models/Chat.js";

// Check if the chatId is valid
export default async function checkValidChatId(chatId) {
	// Check if the chatId is a valid ObjectId
	if (!mongoose.Types.ObjectId.isValid(chatId)) return false;

	try {
		// Check if the chat exists in the database
		const chat = await Chat.findById(chatId);
		if (chat) return true;
		else return false;
	} catch (e) {
		console.log("Error finding chat:\n", e);
		return false;
	}
}
