# Job Interview Chatbot - backend

## Introduction

Welcome to my project, a unique chat application I designed specifically for job interview preparation. This project was conceived and developed as part of a university subject I took called "Prompt Engineering". The main objective of this subject was to explore and utilize the capabilities of generative AI in building practical applications.

My idea was to harness the power of AI to assist users in preparing for their job interviews. To bring this idea to life, I integrated OpenAI's API into my chat application. This integration allows the application to generate intelligent and contextually relevant responses to user's questions, simulating a real-life job interview scenario.

The application provides an interactive platform for users to practice and improve their interview skills. Users can ask questions or express concerns they have about an upcoming interview, and the AI, trained on a vast corpus of data, generates responses that are helpful and informative.

By leveraging the capabilities of generative AI, this application serves as a reliable tool for job interview preparation, providing users with insights and feedback that are available 24/7. It's like having a personal interview coach, available at any time, right at your fingertips.

## Used Tools

### Fastify

Fastify is a web framework highly focused on providing the best developer experience with the least overhead and a powerful plugin architecture. It is highly efficient and designed to be the fastest framework for Node.js.

Advantages of Fastify:

-  Highly performant: Fastify is one of the fastest web frameworks in the Node.js landscape.
-  Extendible: Fastify's plugin architecture is designed to be easy to use and highly flexible.
-  Schema-based: Fastify helps you manage your data using JSON Schema.

### MongoDB

MongoDB is a source-available cross-platform document-oriented database program. It is classified as a NoSQL database program, which means it does not use the traditional table-based relational database structure, providing flexibility and scalability.

Advantages of MongoDB:

-  Document Database: MongoDB's document model is simple for developers to learn and use, while still providing all the capabilities needed to meet complex requirements at any scale.
-  Performance: MongoDB provides high performance data persistence.
-  Scalability: MongoDB is horizontally scalable, which helps in handling more traffic.

### OpenAI's API npm package

OpenAI provides an npm package for their API, which allows developers to easily integrate their AI models into applications. The package provides a simple and intuitive interface to interact with the API.

Advantages of OpenAI's API npm package:

-  Easy Integration: The package simplifies the process of integrating OpenAI's powerful AI models into your application.
-  Comprehensive Documentation: OpenAI provides detailed documentation and usage examples for their npm package.
-  Community Support: Being a popular package, it has a large community of developers who can provide support and answer queries.

## Server Workflow

The server is built using Fastify, a fast and low overhead web framework for Node.js. Here is a general overview of how the server works:

1. **Initialize Fastify**: The server starts by initializing Fastify with logging enabled. This allows us to see detailed logs in the console which can be very helpful for debugging and understanding the flow of requests and responses.

   ```javascript
   const fastify = Fastify({ logger: true });
   ```

2. **Load Configuration**: The server then loads the configuration. This includes environment variables, enabling CORS (Cross-Origin Resource Sharing), and other necessary settings. This configuration is crucial for the server to function correctly and securely.

   ```javascript
   await loadConfig(fastify);
   ```

3. **Initialize OpenAI API**: The OpenAI API is initialized with the API key. This key is necessary to authenticate requests to the OpenAI API.

   ```javascript
   const openai = new OpenAI({
   	apiKey: fastify.config.OPENAI_API_KEY,
   });
   ```

4. **Register Routes**: The server then registers various routes. These routes define the endpoints that the server can respond to. Each route is associated with a specific URL path and a handler function that defines the response to requests at that path.

   ```javascript
   await fastify.register(userRoute, {
   	prefix: "/users",
   });
   await fastify.register(chatRoute, {
   	prefix: "/chats",
   });
   await fastify.register(messageRoute, {
   	prefix: "/messages",
   });
   ```

5. **Start the Server**: Finally, the server starts listening for requests on a specified port. If there is an error starting the server, it will be logged and the process will exit.

   ```javascript
   try {
   	await fastify.listen({ port: 3000 });
   } catch (err) {
   	fastify.log.error(err);
   	process.exit(1);
   }
   ```

This is a high-level overview of the server workflow. Each of these steps will be discussed in more detail in the following sections.

## Database Models

The application uses MongoDB as its database, and Mongoose is used to define the database schema. Here are the models used in the application:

### User Model

The User model represents a user in the application. It has the following fields:

-  `firebase`: An object that contains information related to the user's Firebase account.
   -  `id`: A string that represents the Firebase ID of the user. It is required and cannot be changed once set.
-  `stripe`: An object that contains information related to the user's Stripe account.
   -  `id`: A string that represents the Stripe ID of the user.
   -  `subscriptionEnd`: A date that represents when the user's Stripe subscription ends.
-  `name`: A string that represents the name of the user. It is required.
-  `photoUrl`: A string that represents the URL of the user's photo.
-  `email`: A string that represents the email of the user. It is required.

The model also includes timestamps, so `createdAt` and `updatedAt` fields will be automatically added to each document.

### Chat Model

The Chat model represents a chat in the application. It has the following fields:

-  `position`: A string that represents the position of the chat. It is required. The value is converted to lowercase and whitespace is trimmed.
-  `userId`: An ObjectId that references a User document. It represents the user who owns the chat and is required.

The model also includes timestamps, so `createdAt` and `updatedAt` fields will be automatically added to each document.

### Message Model

The Message model represents a message in the application. It has the following fields:

-  `role`: A string that represents the role of the sender of the message. It is required and must be one of the following: "system", "assistant", "user".
-  `content`: A string that represents the content of the message. It is required.
-  `tokens`: A number that represents the number of tokens associated with the message. It is required and defaults to 0.
-  `timestamp`: A date that represents when the message was sent. It is required and defaults to the current date and time.
-  `chatId`: An ObjectId that references a Chat document. It represents the chat where the message was sent and is required.

## Endpoints

The application provides a set of RESTful API endpoints that allow clients to interact with the data in the application. These endpoints are organized around the main resources in the application: Users, Chats, and Messages.

Each endpoint is defined with a Fastify-specific schema. Fastify schemas are a powerful feature that allows for faster serialization and validation of the data. They can boost the performance of your application by reducing the overhead of runtime type checking and data transformation.

According to Fastify's benchmarks, applications using Fastify schemas can be up to 20% faster than those using traditional runtime validation libraries. This can result in significant performance improvements for high-traffic applications.

### User Endpoints

These endpoints allow clients to create, retrieve, update, and delete User resources. They also provide functionality for user authentication and account management.

#### `GET /:firebaseId`

This endpoint retrieves a user by their Firebase ID. The Firebase ID should be provided as a path parameter.

#### `PUT /:userId`

This endpoint updates a user by their user ID. The user ID should be provided as a path parameter. The updated user data should be provided in the request body.

#### `DELETE /:userId`

This endpoint deletes a user by their user ID. The user ID should be provided as a path parameter.

#### `POST /`

This endpoint creates a new user. The user data should be provided in the request body.

### Chat Endpoints

These endpoints allow clients to create, retrieve, and delete Chat resources. They also provide functionality for managing the list of users in a chat.

#### `GET /:chatId`

This endpoint retrieves a chat by its ID. The chat ID should be provided as a path parameter.

#### `DELETE /:chatId`

This endpoint deletes a chat by its ID. The chat ID should be provided as a path parameter.

#### `GET /`

This endpoint retrieves all chats for a user. The user's ID should be provided in the request header.

#### `POST /`

This endpoint creates a new chat. The chat data should be provided in the request body.

### Message Endpoints

These endpoints allow clients to create, retrieve, and delete Message resources. They also provide functionality for sending messages in a chat.

#### `DELETE /:messageId`

This endpoint deletes a message by its ID. The message ID should be provided as a path parameter.

#### `GET /`

This endpoint retrieves all messages for a chat. The chat's ID should be provided in the request header.

#### `POST /`

This endpoint creates a new message. The message data should be provided in the request body.

## Credits and Summary

This project was created by István Kurucz. The purpose of this backend is to provide a robust and scalable infrastructure for a chat application. It is built with [Technologies Used] and follows best practices for backend development.

The backend supports user authentication, chat management, and message handling. It provides a set of RESTful API endpoints that allow clients to interact with the data in the application. Each endpoint is defined with a Fastify-specific schema, which boosts the performance of the application by reducing the overhead of runtime type checking and data transformation.

This project was a great opportunity to learn and apply the power generative AI is giving in a real-world context. It was challenging and rewarding, and I'm proud of the result.

Thank you for taking the time to review this project. If you have any questions or feedback, please feel free to contact me in email (istvan.kurucz@edu.bme.hu).
