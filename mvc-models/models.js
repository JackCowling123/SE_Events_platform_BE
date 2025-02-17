const mongoose = require('mongoose'); // imports mongo capabilties

const eventSchema = new mongoose.Schema({
    skiddleId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    venue: { type: String, required: true },
    description: { type: String },
    image: { type: String },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

// creates new schema for the mongoDB to be sent back to