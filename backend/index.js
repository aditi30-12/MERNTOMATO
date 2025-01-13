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


mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,  // Timeout after 5 seconds
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process if connection fails
    });


// Middlewares
app.use(bodyparser.json()); // Body-parser middleware to parse JSON request bodies
app.use(express.json()); // Built-in express middleware to parse JSON

// Enable CORS for cross-origin requests
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// Middleware to attach MongoDB client to the request object
app.use((req, res, next) => {
    req.dbClient = client;
    next();
});

// Routes
app.use('/api', require("./Routes/user.js")); // Routes for creating a user
app.use('/api', require("./Routes/foodData.js")); // Routes for displaying data
app.use('/api/cart', require("./Routes/cart.js")); // Routes for cart

// Simple test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`);
});
