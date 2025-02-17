const axios = require('axios'); // Imports axios, used to make API requests
const Event = require('../mvc-models/models.js'); // Imports models

const SKIDDLE_API_KEY = process.env.SKIDDLE_API_KEY; // Variable for Skiddle APi key
const BASE_URL = 'https://www.skiddle.com/api/v1'; // URL for skiddle api

// Fetch events from Skiddle API and save to MongoDB
const fetchAndSaveEvents = (req, res, next) => {
    axios.get(`${BASE_URL}/events/`, { // Gets events based in Manchester centre within 10 mile radius
        params: {
            api_key: SKIDDLE_API_KEY,
            latitude: 53.4808, // Manchester latitude
            longitude: -2.2426, // Manchester longitude
            radius: 10,
        },
    })
        .then(response => {
            if (!response.data.results || response.data.results.length === 0) { // if there's no results show error
                const err = new Error('No events found');
                err.status = 404;
                return next(err); // Pass error to Express error handler
            }

            const events = response.data.results.map(event => ({ // if results are found them map them
                skiddleId: event.id,
                title: event.eventname,
                date: event.date,
                venue: event.venue.name,
                description: event.description,
                image: event.largeimageurl,
            }));

            return Event.insertMany(events).then(() => { //Event calls the function in models first to format the data. insertMany is then called  a mongoose method that allows multiple insertions of all events just got
                res.status(201).json({ message: 'Events saved to DB', events });
            });
        })
        .catch(error => { // if there's an error fetching events, this will catch it
            const err = new Error('Error fetching or saving events');
            err.status = 500;
            err.msg = error.message || 'Server error';
            next(err);
        });
};



// Fetch events from MongoDB
const getLocalEvents = async (req, res) => {
    try {
        const events = await Event.find(); // queries all events from MongoDB & waits for respons ebefore moving to the next line
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching events from database' });
    }
};

module.exports = { fetchAndSaveEvents, getLocalEvents };