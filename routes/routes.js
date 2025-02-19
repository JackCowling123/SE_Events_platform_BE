const express = require('express'); // Creates an express app (web server for Node, used to handle http requests)
const { fetchAndSaveEvents, getLocalEvents, getEventById, createEvent} = require('../mvc-controllers/controllers.js'); // Imports functions. fetchAndSaveEvents fetches events from a Skiddle and saves them to MongoDB. getLocalEvents retrieves previously stored events from MongoDB.
const { getCalendarLink } = require("../mvc-controllers/controllers"); // Imports the calendar link appplication
const { authenticate, authorizeAdmin } = require("../middlewares/authMiddleware");

const router = express.Router(); // Uses express but allows routes to be defined in seperate files.

// Fetches events from Skiddle API and store them in MongoDB
router.get('/events/save', fetchAndSaveEvents);

// Retrieve link to add to google calendar
router.get("/event/:eventId/calendar-link", getCalendarLink);

// Retrieve saved events from MongoDB
router.get('/events/local', getLocalEvents);

router.get("/events/:id", getEventById);

router.post("/events", authenticate, authorizeAdmin, createEvent);


module.exports = router;