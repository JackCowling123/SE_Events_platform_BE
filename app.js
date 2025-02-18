require('dotenv').config(); // Reads variables from .env so they can be used in the code
const express = require('express'); // Creates an express app (web server for Node, used to handle http requests)
const cors = require('cors'); // Allows you to specify which domains can access your API, blocks others)


const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
const eventRoutes = require('./routes/routes'); // handles event operations
const authRoutes = require('./routes/authRoutes'); // Handles authentication for security
const responseRoutes = require('./routes/responseRoutes'); // Import response routes


app.use('/api', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', responseRoutes);

// Middleware to catch 404 errors (route not found)
app.use((req, res, next) => {
    const err = new Error('Invalid input');
    err.status = 404;
    err.msg = 'Invalid input';
    next(err);
});

// Middlware for general Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({ msg: err.msg || 'Internal Server Error' });
});

module.exports = app;