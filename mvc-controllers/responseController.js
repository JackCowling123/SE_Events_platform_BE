const Response = require('../mvc-models/responseModels');

const setResponse = async (req, res) => {
    try {
        const { eventId, response } = req.body;
        const userId = req.user.id; // Ensure user ID is retrieved from token

        if (!['going', 'maybe', 'not going'].includes(response)) {
            return res.status(400).json({ error: "Invalid response. Choose 'going', 'maybe', or 'not going'." });
        }

        // Find existing response
        let existingResponse = await Response.findOne({ userId, eventId });

        if (existingResponse) {
            // Update existing response
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

const getUserResponse = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from token
        const { eventId } = req.params;

        const response = await Response.findOne({ userId, eventId });

        if (!response) {
            return res.status(404).json({ message: "No response found for this event" });
        }

        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: "Server error fetching response" });
    }
};


module.exports = { setResponse, getUserResponse };
