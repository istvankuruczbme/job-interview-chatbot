import fastifyEnv from "@fastify/env";
import fastifyCors from "@fastify/cors";
import mongoose from "mongoose";

// Options for fastify-env
const envOptions = {
	schema: {
		type: "object",
		properties: {
			OPENAI_API_KEY: { type: "string" },
			MONGO_URI: { type: "string" },
			CLIENT_URL: { type: "string" },
		},
		required: ["OPENAI_API_KEY", "MONGO_URI", "CLIENT_URL"],
	},
	dotenv: true,
};

export default async function loadConfig(fastify) {
	// Load .env variables
	await fastify.register(fastifyEnv, envOptions);

	// Enable CORS
	await fastify.register(fastifyCors, {
		origin: fastify.config.CLIENT_URL,
	});

	// Connect to MongoDB
	try {
		await mongoose.connect(fastify.config.MONGO_URI);
		console.log("Connected to MongoDB");
	} catch (e) {
		console.error("Failed to connect to MongoDB", e);
	}
}
