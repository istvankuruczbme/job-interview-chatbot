import mongoose from "mongoose";
import Message from "../models/Message.js";

// Check if the messageId is valid
export default async function checkValidMessageId(messageId) {
	// Check if the messageId is a valid ObjectId
	if (!mongoose.Types.ObjectId.isValid(messageId)) return false;

	try {
		// Check if the message exists in the database
		const message = await Message.findById(messageId);
		if (message) return true;
		else return false;
	} catch (e) {
		console.log("Error finding message:\n", e);
		return false;
	}
}
