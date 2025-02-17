const Response = require('../mvc-models/responseModel');

// Set or update user response for an event
const setResponse = async (req, res) => {
    try {
        const { eventId, response } = req.body;
        const userId = req.user.id; // Get user ID from the authenticated request

        // Validate response type
        if (!['going', 'maybe', 'not going'].includes(response)) {
            return res.status(400).json({ error: "Invalid response. Choose 'going', 'maybe', or 'not going'." });
        }

        // Find existing response
        let existingResponse = await Response.findOne({ userId, eventId }); //calls imported Response function

        if (existingResponse) {
            // Update exsisting respomse
            existingResponse.response = response;
            await existingResponse.save();
            return res.json({ message: `Response updated to '${response}'`, response: existingResponse });
        } else {
            // Create a new response if none exists
            const newResponse = new Response({ userId, eventId, response });
            await newResponse.save();
            return res.json({ message: `Response set to '${response}'`, response: newResponse });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error updating response" });
    }
};

module.exports = { setResponse };
