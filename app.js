require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const SKIDDLE_API_KEY = process.env.SKIDDLE_API_KEY;
const BASE_URL = 'https://www.skiddle.com/api/v1';

app.get('/events', async (req, res) => {
    try {
        const { keyword, location } = req.query;
        const response = await axios.get(`${BASE_URL}/events/`, {
            params: {
                api_key: SKIDDLE_API_KEY,
                keyword,
                latitude: location?.lat,
                longitude: location?.lng,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching events' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));