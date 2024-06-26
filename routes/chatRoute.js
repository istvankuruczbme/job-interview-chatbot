import addChat from "../controllers/chat/addChat.js";
import getUserChats from "../controllers/chat/getUserChats.js";
import deleteChat from "../controllers/chat/deleteChat.js";
import checkExistingChat from "../controllers/chat/checkExistingChat.js";
import getChat from "../controllers/chat/getChat.js";

// Route for handling chat related requests
export default function chatRoute(fastify, _, done) {
	// Get a chat
	fastify.get("/:chatId", { schema: getChatSchema }, getChat);

	// Delete a chat
	fastify.delete("/:chatId", { schema: deleteChatSchema }, deleteChat);

	// Get the chats of the user
	fastify.get("/", { schema: getUserChatsSchema }, getUserChats);

	// Create new chat
	fastify.post("/", { schema: addChatSchema, preHandler: checkExistingChat }, addChat);

	done();
}

// Schemas for the chat route
const chatSchema = {
	type: ["object", "null"],
	properties: {
		_id: { type: "string" },
		position: { type: "string" },
		userId: { type: "string" },
		createdAt: { type: "string" },
		updatedAt: { type: "string" },
		__v: { type: "number" },
	},
	required: ["_id", "position", "userId", "createdAt", "updatedAt"],
};

const getChatSchema = {
	params: {
		type: "object",
		properties: {
			chatId: { type: "string" },
		},
		required: ["chatId"],
	},
	response: {
		default: chatSchema,
	},
};

const deleteChatSchema = {
	params: {
		type: ["object", "null"],
		properties: {
			chatId: { type: "string" },
		},
		required: ["chatId"],
	},
	response: {
		default: { type: "string" },
	},
};

const getUserChatsSchema = {
	querystring: {
		type: "object",
		properties: {
			userId: { type: "string" },
		},
		required: ["userId"],
	},
	response: {
		default: {
			type: ["array", "null"],
			items: chatSchema,
		},
	},
};

const addChatSchema = {
	body: {
		type: "object",
		properties: {
			position: { type: "string" },
			userId: { type: "string" },
		},
		required: ["position", "userId"],
	},
	response: {
		default: chatSchema,
	},
};
