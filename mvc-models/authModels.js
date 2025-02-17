const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ // defines schema for future users
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

const User = mongoose.model('User', userSchema); // creates MongoDB collection called users. Now database operations can be perfomed on users such as find, create, update & delete
module.exports = User;