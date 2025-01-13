const mongoose = require('mongoose');

// Define the schema for a FoodItem
const foodItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    cuisine: { type: String, required: true },
    ingredients: { type: [String], required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
});

// Create the Mongoose model for FoodItems
const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;
