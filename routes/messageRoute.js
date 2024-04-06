import addMessage from "../controllers/message/addMessage.js";
import deleteMessage from "../controllers/message/deleteMessage.js";
import generateMessage from "../controllers/message/generateMessage.js";
import getChatMessages from "../controllers/message/getChatMessages.js";

// Route for handling message related requests
export default function messageRoute(fastify, _, done) {
	// Delete a message
	fastify.delete("/:messageId", { schema: deleteMessageSchema }, deleteMessage);

	// Get the messages of the chat
	fastify.get("/", { schema: getChatMessagesSchema }, getChatMessages);

	// Create new message
	fastify.post("/", { schema: addMessageSchema, preHandler: generateMessage }, addMessage);

	done();
}

// Schemas for the message route
const messageSchema = {
	type: ["object", "null"],
	properties: {
		_id: { type: "string" },
		role: { type: "string" },
		content: { type: "string" },
		tokens: { type: "number" },
		timestamp: { type: "string" },
		chatId: { type: "string" },
		__v: { type: "number" },
	},
	required: ["_id", "role", "content", "tokens", "timestamp", "chatId"],
};

const deleteMessageSchema = {
	params: {
		type: "object",
		properties: {
			messageId: { type: "string" },
		},
		required: ["messageId"],
	},
	response: {
		default: { type: ["string", "null"] },
	},
};

const getChatMessagesSchema = {
	queryString: {
		type: "object",
		properties: {
			chatId: { type: "string" },
			limit: { type: "number" },
		},
		required: ["chatId"],
	},
	response: {
		default: {
			type: "array",
			items: messageSchema,
		},
	},
};

const addMessageSchema = {
	body: {
		type: "object",
		properties: {
			prompt: {
				type: "object",
				properties: {
					type: { type: "string", enum: ["PROFESSIONAL_QUESTION", "GENERAL_QUESTION"] },
					level: { type: "string", enum: ["basic", "intermediate", "advanced"] },
					content: { type: "string" },
				},
				required: ["type"],
			},
			timestamp: { type: "string" },
			chatId: { type: "string" },
		},
		required: ["chatId"],
	},
	response: {
		default: {
			type: ["array", "null"],
			items: messageSchema,
		},
	},
};
