const express =require('express')
const router = express.Router()
const FoodItem = require('../models/FoodItem')
// Define the route to fetch food items
router.post('/foodData', async (req, res) => {
    try {
        // Fetch all food items from the FoodItems collection using Mongoose
        const foodItems = await FoodItem.find();  // This is a Mongoose method to find all documents

        if (foodItems.length === 0) {
            return res.status(404).json({ message: 'No data found' });
        }

        // Send the fetched food items as JSON response
        res.json(foodItems);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;