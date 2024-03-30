import mongoose from "mongoose";

// Schema for a user
const UserSchema = new mongoose.Schema(
	{
		firebase: {
			id: {
				type: String,
				default: "",
			},
		},
		stripe: {
			id: {
				type: String,
				default: "",
			},
			subscriptionEnd: Date,
		},
		name: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", UserSchema);

export default User;
