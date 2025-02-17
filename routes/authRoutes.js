const express = require('express'); // imports express for API routes
const { registerUser, loginUser } = require('../mvc-controllers/authControllers.js'); // imports authentication functionality from authControllers

const router = express.Router();

// Signup Route
router.post('/register', registerUser); // when user sends a post request for /register, it calls registerUser from authControllers


// Login Route
router.post('/login', loginUser); // when user sends a post request for /login, it calls loginUser from authControllers

module.exports = router;