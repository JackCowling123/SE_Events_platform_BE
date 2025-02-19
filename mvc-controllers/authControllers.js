const User = require('../mvc-models/authModels');
const jwt = require('jsonwebtoken'); // used to create secure authetication token
const bcrypt = require('bcryptjs');

// Generate JWT Token
const generateToken = (user) => { //generates JWT token for authetication each time they log in
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role }, //this is the payload inside the token
        process.env.JWT_SECRET, // secret key used to encrypt and verify token
        { expiresIn: '7d' } // token expires in 7 days
    );
};

// User Signup
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const userRole = role === "admin" ? "admin" : "user";

        // Check if user already exists
        let existingUser = await User.findOne({ email }); // findOne is a mongoose operation used to see if it's already in the database. User is the imported function above
        if (existingUser) return res.status(400).json({ error: 'User already exists' }); //if user exists


        // Hashes password, turning it into something really long and hard to guess
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword, userRole });
        await newUser.save(); // saves to MongoDB

        // Generate token and sends back to frontend for use
        const token = generateToken(newUser);
        res.status(201).json({ message: 'User registered', token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


// User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' }); //if user isn't found then this is returned

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        // Generate token & adds userrole in there
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { registerUser, loginUser };