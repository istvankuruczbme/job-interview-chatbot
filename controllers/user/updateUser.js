import User from "../../models/User.js";

// Function that updates the given properties of a user
export default async function updateUser(req, reply) {
	// Extract userId from the request parameters
	const { userId } = req.params;

	console.log(req.body);

	// Check if userId is provided
	if (!userId) {
		console.log("User ID is not provided");
		return null;
	}

	try {
		// Find the user by ID
		const user = await User.findById(userId);
		if (!user) {
			console.log("User not found");
			return null;
		}

		// Update the user with the new data
		user.set(req.body);

		// Save the updated user
		await user.save();
		return user;
	} catch (e) {
		console.log("Error updating user:\n", e);
		return null;
	}
}
