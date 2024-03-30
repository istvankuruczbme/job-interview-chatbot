import addMessage from "../controllers/message/addMessage.js";
import deleteMessage from "../controllers/message/deleteMessage.js";
import generateMessage from "../controllers/message/generateMessage.js";
import getChatMessages from "../controllers/message/getChatMessages.js";

// Route for handling message related requests
export default function messageRoute(fastify, _, done) {
	// Delete a message
	fastify.delete("/:messageId", deleteMessage);

	// Generate a message with ChatGPT
	fastify.post("/generate", generateMessage);

	// Get the messages of the chat
	fastify.get("/", getChatMessages);

	// Create new message
	fastify.post("/", addMessage);

	done();
}
