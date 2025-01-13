const express =require('express')
const router = express.Router()
router.post('/foodData',async (req,res)=>{
    try {
        const db = req.dbClient.db('Tomato');  // Select the database
        const collection = db.collection('FoodItems');  // Select the collection

        // Fetch all documents from the FoodItems collection
        const foodItems = await collection.find().toArray();

        if (foodItems.length === 0) {
            return res.status(404).json({ message: 'No data found' });
        }

        // Send the data as JSON response
        res.json(foodItems);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router;