import addUser from "../controllers/user/addUser.js";
import deleteUser from "../controllers/user/deleteUser.js";
import getUser from "../controllers/user/getUser.js";
import updateUser from "../controllers/user/updateUser.js";

// Route for handling user related requests
export default function userRoute(fastify, _, done) {
	// Get a user by ID
	fastify.get("/:firebaseId", getUser);

	// Update a user by ID
	fastify.put("/:userId", updateUser);

	// Delete a user by ID
	fastify.delete("/:userId", deleteUser);

	// Create new user
	fastify.post("/", addUser);

	done();
}
