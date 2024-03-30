import addMessage from "../controllers/message/addMessage.js";
import getChatMessages from "../controllers/message/getChatMessages.js";

// Route for handling message related requests
export default function messageRoute(fastify, _, done) {
	// Get the messages of the chat
	fastify.get("/", getChatMessages);

	// Create new message
	fastify.post("/", addMessage);

	done();
}
