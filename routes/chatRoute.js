import addChat from "../controllers/chat/addChat.js";
import getUserChats from "../controllers/chat/getUserChats.js";

// Route for handling chat related requests
export default function chatRoute(fastify, _, done) {
	// Get the chats of the user
	fastify.get("/", getUserChats);

	// Create new chat
	fastify.post("/", addChat);

	done();
}
