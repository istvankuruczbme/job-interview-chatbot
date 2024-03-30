import User from "../../models/User.js";

// Function to create a new user in the DB
export default async function addUser(req, reply) {
	// Get the firebase, stripe and name from the request body
	const { firebase, stripe, name } = req.body;

	// Create a new user based on the User model
	const user = new User({ firebase, stripe, name });
	try {
		// Save the user to the DB
		await user.save();
		return user;
	} catch (e) {
		console.log("Error creating the user:\n", e);
		return null;
	}
}
