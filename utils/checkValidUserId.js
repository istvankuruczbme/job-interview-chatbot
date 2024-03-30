import mongoose from "mongoose";
import User from "../models/User.js";

// Check if the userId is valid
export default async function checkValidUserId(userId) {
	// Check if the userId is a valid ObjectId
	if (!mongoose.Types.ObjectId.isValid(userId)) return false;

	try {
		// Check if the user exists in the database
		const user = await User.findById(userId);
		if (user) return true;
		else return false;
	} catch (e) {
		console.log("Error finding user:\n", e);
		return false;
	}
}
