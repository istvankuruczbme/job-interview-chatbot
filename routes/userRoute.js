import addUser from "../controllers/user/addUser.js";
import deleteUser from "../controllers/user/deleteUser.js";
import getUser from "../controllers/user/getUser.js";
import updateUser from "../controllers/user/updateUser.js";

// Route for handling user related requests
export default function userRoute(fastify, _, done) {
	// Get a user by ID
	fastify.get("/:firebaseId", { schema: getUserSchema }, getUser);

	// Update a user by ID
	fastify.put("/:userId", { schema: updateUserSchema }, updateUser);

	// Delete a user by ID
	fastify.delete("/:userId", { schema: deleteUserSchema }, deleteUser);

	// Create new user
	fastify.post("/", { schema: addUserSchema }, addUser);

	done();
}

// Schemas for the user route
const userSchema = {
	type: ["object", "null"],
	properties: {
		_id: { type: "string" },
		firebase: {
			type: "object",
			properties: {
				id: { type: "string" },
			},
			required: ["id"],
		},
		stripe: {
			type: "object",
			properties: {
				id: { type: "string" },
				subscriptionEnd: { type: "string" },
			},
			required: ["id"],
		},
		name: { type: "string" },
		createdAt: { type: "string" },
		updatedAt: { type: "string" },
		__v: { type: "number" },
	},
	required: ["_id", "firebase", "name", "createdAt", "updatedAt"],
};

const getUserSchema = {
	params: {
		type: "object",
		properties: {
			firebaseId: { type: "string" },
		},
		required: ["firebaseId"],
	},
	response: {
		default: userSchema,
	},
};

const updateUserSchema = {
	params: {
		type: "object",
		properties: {
			userId: { type: "string" },
		},
		required: ["userId"],
	},
	response: {
		default: userSchema,
	},
};

const deleteUserSchema = {
	params: {
		type: "object",
		properties: {
			userId: { type: "string" },
		},
		required: ["userId"],
	},
	response: {
		default: {
			type: ["string", "null"],
		},
	},
};

const addUserSchema = {
	body: {
		type: "object",
		properties: {
			firebase: {
				type: "object",
				properties: {
					id: { type: "string" },
				},
				required: ["id"],
			},
			stripe: {
				type: "object",
				properties: {
					id: { type: "string" },
					subscriptionEnd: { type: "string" },
				},
			},
			name: { type: "string" },
		},
		required: ["firebase", "name"],
	},
	response: {
		default: userSchema,
	},
};
