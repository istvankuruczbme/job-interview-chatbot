import Chat from "../../models/Chat.js";
import checkValidUserId from "../../utils/checkValidUserId.js";

export default async function checkExistingChat(req, reply, done) {
	// Convert the position to lowercase
	req.body.position = req.body.position.trim().toLowerCase();

	// Get the position and userId from the request body
	const { position, userId } = req.body;

	// Check if the userId is valid
	const validId = await checkValidUserId(userId);
	if (!validId) {
		console.log("Invalid userId");
		return null;
	}

	try {
		// Find the chat with the userId and position
		const chat = await Chat.findOne({ userId, position });
		req.chatExists = chat !== null;
	} catch (e) {
		console.log("Error finding the chat in the DB: \n", e);
		return null;
	}
}
