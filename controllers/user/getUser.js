import User from "../../models/User.js";

// Function to get user based on Firebase ID
export default async function getUser(req, reply) {
	// Get the user ID from the request parameters
	const { firebaseId } = req.params;

	try {
		// Find the user in the DB based on firebase id
		const user = await User.findOne({ "firebase.id": firebaseId });
		return user;
	} catch (e) {
		console.log("Error getting the user based on the Firebase ID:\n", e);
		return null;
	}
}
