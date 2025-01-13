const mongoose = require('mongoose');

// Define the schema for the User
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,  // Ensure email is unique
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,  // Simple email regex pattern
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

// Create and export the User model
module.exports = mongoose.model('User', userSchema);
