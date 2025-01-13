// Required modules
const express = require('express');
const { MongoClient } = require('mongodb');
const { default: mongoose } = require('mongoose');
let bodyparser = require('body-parser');

// Initialize Express app
const app = express();
const port = 5001; // Port where the server will listen

// MongoDB connection URI
const uri = 'mongodb://localhost:27017/Tomato';
const client = new MongoClient(uri);

// Middlewares
app.use(bodyparser.json()); // Body-parser middleware to parse JSON request bodies
app.use(express.json()); // Built-in express middleware to parse JSON

// Enable CORS for cross-origin requests
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Middleware to attach MongoDB client to the request object
app.use((req, res, next) => {
    req.dbClient = client;
    next();
});

// Routes
app.use('/api', require("./Routes/CreateUser.js")); // Routes for creating a user
app.use('/api', require("./Routes/DisplayData.js")); // Routes for displaying data

// Simple test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// MongoDB connection function
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully!");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit if MongoDB connection fails
    }
}

// Start Express server and connect to MongoDB
app.listen(port, async () => {
    await connectToMongoDB(); // Ensure MongoDB is connected before starting the server
    console.log(`Example app listening on port ${port}`);
});
