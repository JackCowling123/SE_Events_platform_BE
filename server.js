const app = require("./app"); // Imports Express app, where main functionality happens
const connectDB = require("./config/db"); // Connect to NoSQL DB, MongoDB. Setup is handled in db.js

const PORT = process.env.PORT || 9090; // Uses environment variable PORT or defaults to 9090 if running locally

connectDB()
    .then(() => {
        app.listen(PORT, () => { // Ensures server starts only if DB connects
            console.log(`✅ Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Server failed to start due to DB connection error:", error);
        process.exit(1); // Stops server if MongoDB connection fails
    });