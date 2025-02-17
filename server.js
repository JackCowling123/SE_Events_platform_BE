const app = require("./app"); // Imports Express app, where main functionality happens
const connectDB = require("./config/db"); // Connect to NoSQL DB, MongoDB. Setup is handled in db.js

const PORT = process.env.PORT || 9090; // Uses environment variable PORT or defaults to 9090 if running locally

const startServer = async () => {
    try {
        await connectDB(); // Ensures MongoDB is connected before starting the server

        app.listen(PORT, () => { // Makes the app listen for requests
            console.log(`Server running on port ${PORT}`); // Logs successful server startup
        });
    } catch (error) {
        console.error("Server failed to start:", error); // Logs error if server fails to start
        process.exit(1); // Stops server if startup failed
    }
};

startServer();