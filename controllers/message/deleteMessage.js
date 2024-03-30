import Message from "../../models/Message.js";
import checkValidMessageId from "../../utils/checkValidMessageId.js";

// Function that deletes a message
export default async function deleteMessage(req, reply) {
	// Extract messageId from the request parameters
	const { messageId } = req.params;

	// Check if messageId is provided
	if (!messageId) {
		console.log("Message ID is required");
		return null;
	}

	// Check if the message exists
	const validMessage = await checkValidMessageId(messageId);
	if (!validMessage) {
		console.log("Invalid message ID");
		return null;
	}

	try {
		// Delete the message
		await Message.deleteOne({ _id: messageId });
		return "Message deleted successfully";
	} catch (e) {
		console.log("Error finding the message:\n", e);
		return null;
	}
}
