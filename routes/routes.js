const express = require('express'); // Creates an express app (web server for Node, used to handle http requests)
const { fetchAndSaveEvents, getLocalEvents } = require('../mvc-controllers/controllers.js'); // Imports functions. fetchAndSaveEvents fetches events from a Skiddle and saves them to MongoDB. getLocalEvents retrieves previously stored events from MongoDB.

const router = express.Router(); // Uses express but allows routes to be definited in seperate files.

// Fetches events from Skiddle API and store them in MongoDB
router.get('/events/save', fetchAndSaveEvents);

// Retrieve saved events from MongoDB
router.get('/events/local', getLocalEvents);

module.exports = router;