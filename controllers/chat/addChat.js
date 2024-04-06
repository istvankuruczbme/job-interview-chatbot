import Chat from "../../models/Chat.js";

// Function to create a new chat in the DB
export default async function addChat(req, reply) {
	// Get the position and userId from the request body
	const { position, userId } = req.body;

	if (req.chatExists) {
		console.log("Chat already exists");
		return null;
	}

	try {
		// Create a new chat with the position and userId
		const chat = new Chat({ position, userId });

		// Save the chat to the DB
		await chat.save();
		return chat;
	} catch (e) {
		console.log("Error creating chat:\n", e);
		return null;
	}
}
