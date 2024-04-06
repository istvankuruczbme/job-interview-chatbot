import mongoose from "mongoose";

// Schema for a chat
const ChatSchema = new mongoose.Schema(
	{
		position: {
			type: String,
			lowercase: true,
			trim: true,
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Chat = mongoose.model("Chat", ChatSchema);

export default Chat;
