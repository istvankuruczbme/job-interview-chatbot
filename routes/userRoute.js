import addUser from "../controllers/user/addUser.js";
import getUser from "../controllers/user/getUser.js";

// Route for handling user related requests
export default function userRoute(fastify, _, done) {
	// Get a user by ID
	fastify.get("/:firebaseId", getUser);

	// Create new user
	fastify.post("/", addUser);

	done();
}
