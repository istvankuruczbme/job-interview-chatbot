import Chat from "../../models/Chat.js";
import Message from "../../models/Message.js";
import User from "../../models/User.js";
import checkValidUserId from "../../utils/checkValidUserId.js";

// Function that deletes a user from the DB
export default async function deleteUser(req, reply) {
	// Extract userId from the request parameters
	const { userId } = req.params;

	// Check if userId is provided
	if (!userId) {
		console.log("User ID is required");
		return null;
	}

	// Check if the user exists
	const validUserId = await checkValidUserId(userId);
	if (!validUserId) {
		console.log("User not found");
		return null;
	}

	try {
		// Get the chats of the user then delete the messages of each chat
		const chats = await Chat.find({ userId: userId });
		chats.forEach(async (chat) => {
			await Message.deleteMany({ chatId: chat._id });
		});

		// Delete the chats of the user
		await Chat.deleteMany({ userId: userId });

		// Delete the user
		await User.deleteOne({ _id: userId });
		return "User deleted successfully";
	} catch (e) {
		console.log("Error deleting the user:\n", e);
		return null;
	}
}
