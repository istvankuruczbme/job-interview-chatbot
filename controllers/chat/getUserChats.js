import Chat from "../../models/Chat.js";
import checkValidUserId from "../../utils/checkValidUserId.js";

// Function to get all chats for a user
export default async function getUserChats(req, reply) {
	// Get the userId from the request
	const { userId } = req.query;

	// Check if there is a userId in the request
	if (!userId) {
		console.log("No userId provided");
		return null;
	}

	// Check if the userId is valid
	const validId = await checkValidUserId(userId);
	if (!validId) {
		console.log("Invalid userId");
		return null;
	}

	try {
		// Find all chats for the user
		const chats = await Chat.find({ userId }).sort({ createdAt: "desc" });
		return chats;
	} catch (e) {
		console.log("Error getting chats:\n", e);
		return null;
	}
}
