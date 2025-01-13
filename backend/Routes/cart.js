const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const FoodItem = require('../models/FoodItem');
const { authenticateUser } = require('../middleware/authMiddleware'); // Custom middleware to verify user is logged in

// Add item to cart
router.post('/add', authenticateUser, async (req, res) => {
    const { foodItemId, quantity } = req.body;

    // Check if the food item exists
    const foodItem = await FoodItem.findById(foodItemId);
    if (!foodItem) {
        return res.status(400).json({ message: "Food item not found" });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ userId: req.user.userId });

    // If no cart exists, create a new one
    if (!cart) {
        cart = new Cart({
            userId: req.user.userId,
            items: [{ foodItemId, quantity, price: foodItem.price }],
            totalPrice: foodItem.price * quantity
        });
    } else {
        // Check if the item already exists in the cart
        const itemIndex = cart.items.findIndex(item => item.foodItemId.toString() === foodItemId);
        if (itemIndex > -1) {
            // Item already in cart, update quantity and price
            cart.items[itemIndex].quantity += quantity;
            cart.items[itemIndex].price = foodItem.price * cart.items[itemIndex].quantity;
        } else {
            // Item not in cart, add it
            cart.items.push({ foodItemId, quantity, price: foodItem.price * quantity });
        }

        // Recalculate total price
        cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price, 0);
    }

    // Save the cart
    await cart.save();
    res.json(cart);
});

// View cart
router.get('/view', authenticateUser, async (req, res) => {
    const cart = await Cart.findOne({ userId: req.user.userId }).populate('items.foodItemId');
    if (!cart) {
        return res.status(404).json({ message: "Cart is empty" });
    }
    res.json(cart);
});

// Remove item from cart
router.post('/remove', authenticateUser, async (req, res) => {
    const { foodItemId, quantity } = req.body;

    // Validate the quantity
    if (!quantity || quantity <= 0) {
        return res.status(400).json({ message: "Invalid quantity" });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(item => item.foodItemId.toString() === foodItemId);

    if (itemIndex === -1) {
        return res.status(404).json({ message: "Item not found in cart" });
    }

    // Reduce the quantity of the item
    const item = cart.items[itemIndex];

    // If the quantity is greater than the available quantity in the cart, return an error
    if (item.quantity < quantity) {
        return res.status(400).json({ message: "Not enough quantity in cart to remove" });
    }

    // Update the item's quantity
    item.quantity -= quantity;

    // If quantity reaches zero, remove the item completely from the cart
    if (item.quantity === 0) {
        cart.items.splice(itemIndex, 1);
    }

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((acc, item) => acc + (item.foodItemId.price * item.quantity), 0);

    // Save the updated cart
    await cart.save();

    res.json(cart); // Return the updated cart
});


module.exports = router;
