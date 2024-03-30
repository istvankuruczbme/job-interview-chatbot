import mongoose from "mongoose";

// Schema for a message
const MessageSchema = new mongoose.Schema({
	role: {
		type: String,
		required: true,
		enum: ["system", "assistant", "user"],
	},
	content: {
		type: String,
		required: true,
	},
	totalTokens: {
		type: Number,
		default: 0,
		required: true,
	},
	timestamp: {
		type: Date,
		default: Date.now,
		required: true,
	},
	chatId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Chat",
		required: true,
	},
});

const Message = mongoose.model("Message", MessageSchema);

export default Message;
