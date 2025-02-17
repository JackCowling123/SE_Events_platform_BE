const mongoose = require("mongoose"); // Imports mongoose and allows Node.js to connect to MongoDB
require("dotenv").config(); // Reads variables from .env so they can be used in the code

const connectDB = async () => { // Function to connect to MongoDB
    try {
        if (!process.env.MONGO_URI) { // Check if MONGO_URI is set in environment variables
            console.error("ERROR: MongoDB URI is missing. Check environment variables.");
            process.exit(1);
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, { // Attempts to connect to MongoDB
            useNewUrlParser: true, // Ensures correct connection string format
            useUnifiedTopology: true, // Uses the new MongoDB driver engine for better stability
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`); // Logs this if connection is successful
    } catch (error) {
        console.error("MongoDB Connection Error:", error); // Logs this if there is a connection error
        process.exit(1); // Stop the app if DB connection fails
    }
};

module.exports = connectDB; // Exports the function so it can be used in server.js
