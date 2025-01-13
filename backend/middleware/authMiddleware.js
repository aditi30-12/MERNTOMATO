const jwt = require('jsonwebtoken');
const jwtSecret = "secret"; // Or fetch it from env variables

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

    try {
        const decoded = jwt.verify(tokenWithoutBearer, jwtSecret);
        req.user = decoded; // Attach the user to the request object
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { authenticateUser };
