const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({ // defines new scheme
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    response: {
        type: String,
        enum: ['going', 'maybe', 'not going'],
        required: true
    }
}, { timestamps: true });

const Response = mongoose.model('Response', responseSchema);
module.exports = Response;