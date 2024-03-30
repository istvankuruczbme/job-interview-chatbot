import Message from "../../models/Message.js";

// Function to add a message to a chat
export default async function addMessage(req, reply) {
	try {
		const messages = await Promise.all(
			req.messages.map(async (message) => {
				// Create the message with the given parameters
				const newMessage = new Message({
					role: message.role,
					content: message.content,
					tokens: message.tokens,
					timestamp: message.timestamp,
					chatId: message.chatId,
				});

				// Save the chat to the DB
				await newMessage.save();
				return newMessage;
			})
		);

		return messages;
	} catch (e) {
		console.log("Error adding message:\n", e);
		return null;
	}
}
