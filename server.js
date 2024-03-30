import Fastify from "fastify";
import OpenAI from "openai";

import loadConfig from "./config/config.js";

import userRoute from "./routes/userRoute.js";
import chatRoute from "./routes/chatRoute.js";
import messageRoute from "./routes/messageRoute.js";

// Initialize Fastify
const fastify = Fastify({ logger: true });

// Load config
await loadConfig(fastify);

// Initialize OpenAI API
const openai = new OpenAI({
	apiKey: fastify.config.OPENAI_API_KEY,
});

// Register routes
await fastify.register(userRoute, {
	prefix: "/users",
});
await fastify.register(chatRoute, {
	prefix: "/chats",
});
await fastify.register(messageRoute, {
	prefix: "/messages",
});

// Start the server
try {
	await fastify.listen({ port: 3000 });
} catch (err) {
	fastify.log.error(err);
	process.exit(1);
}

export { fastify, openai };
