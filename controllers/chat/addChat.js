import Chat from "../../models/Chat.js";
import checkValidUserId from "../../utils/checkValidUserId.js";

// Function to create a new chat in the DB
export default async function addChat(req, reply) {
	// Get the position and userId from the request body
	const { position, userId } = req.body;

	// Check if the userId is valid
	const validId = await checkValidUserId(userId);
	if (!validId) {
		console.log("Invalid userId");
		return null;
	}

	// Create a new chat with the position and userId
	const chat = new Chat({ position, userId });
	try {
		// Save the chat to the DB
		await chat.save();
		return chat;
	} catch (e) {
		console.log("Error creating chat:\n", error);
		return null;
	}
}
