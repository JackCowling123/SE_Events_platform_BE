const express = require('express');
const { setResponse, getEventResponses, getUserResponse } = require('../mvc-controllers/responseController');
const { authenticate } = require('../middlewares/authMiddlewears.js'); // Gets authentication middlewear, ensures only logged in users can access certain routes

const router = express.Router();

// Set or update user response repsonse to events
router.post('/response', authenticate, setResponse);

// Get all responses for a specific event (public)
//router.get('/response/event/:eventId', getEventResponses);

// Get user’s response for an event. Accessable if logged int
router.get('/response/user/:eventId', authenticate, getUserResponse);

module.exports = router;
