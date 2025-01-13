const express =require('express')
const router = express.Router()
const User = require('../models/User')
const {body ,validationResult} =require('express-validator')
const jwt =require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const jwtSecret = "secret"

router.post(
    '/createuser',
    // Express Validator middleware for validation
    body('email').isEmail().withMessage('Invalid email address'),
    body('password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters long'),
    body('name').not().isEmpty().withMessage('Name is required'),
    body('location').not().isEmpty().withMessage('Location is required'),
    async (req, res) => {
        // Check if there are validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Destructure input data from request body
        const { name, email, password, location } = req.body;

        try {
            // Check if user with the given email already exists
            let existingUser = await User.findOne({ email }).exec();
            if (existingUser) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create the new user
            const user = new User({
                name,
                email,
                password: hashedPassword,
                location
            });

            await user.save(); // Save the user to the database

            // Respond with success
            res.json({ success: true, message: 'User created successfully' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
);
router.post('/loginuser', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Compare password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Create a JWT token
        const payload = { userId: user._id, name: user.name, email: user.email }; // Add user ID to the JWT payload
        const authToken = jwt.sign(payload, jwtSecret, { expiresIn: '1h' }); // Token expires in 1 hour

        // Send the token back to the client
        res.json({ success: true, authToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
module.exports = router;