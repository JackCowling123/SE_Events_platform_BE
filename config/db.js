const mongoose = require('mongoose'); // Imports mongoose and allows Node.js to connect to MongoDB
require('dotenv').config(); // Reads variables from .env so they can be used in the code

const connectDB = () => { // function
    mongoose.connect(process.env.MONGO_URI, { // attmepts to connect to MongoDB using the env file and reading MONGO_URI from it.
        useNewUrlParser: true, // uses latest MongoDB connecting string format
        useUnifiedTopology: true, // uses modern connection engine for better stability
    })
        .then(() => {
            console.log('MongoDB connection successful'); // logs this if connection successful
        })
        .catch((error) => {
            console.error('MongoDB connection Error:', error); // logs this if there is a connection error
            process.exit(1); // Stop app if DB connection fails
        });
};

connectDB(); // Call the function to connect

module.exports = mongoose;