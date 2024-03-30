import Fastify from "fastify";
import loadConfig from "./config/config.js";

import userRoute from "./routes/userRoute.js";
import chatRoute from "./routes/chatRoute.js";
import messageRoute from "./routes/messageRoute.js";

const fastify = Fastify({ logger: true });

// Load config
await loadConfig(fastify);

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

// Test route
// fastify.get("/", async (req, reply) => {
// 	return { hello: "world" };
// });

// Start the server
try {
	await fastify.listen({ port: 3000 });
} catch (err) {
	fastify.log.error(err);
	process.exit(1);
}
