import addChat from "../controllers/chat/addChat.js";
import getUserChats from "../controllers/chat/getUserChats.js";
import getChatMessages from "../controllers/message/getChatMessages.js";
import deleteChat from "../controllers/chat/deleteChat.js";

// Route for handling chat related requests
export default function chatRoute(fastify, _, done) {
	// Delete a chat
	fastify.delete("/:chatId", { preHandler: getChatMessages }, deleteChat);

	// Get the chats of the user
	fastify.get("/", getUserChats);

	// Create new chat
	fastify.post("/", addChat);

	done();
}
