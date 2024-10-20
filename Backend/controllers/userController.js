const mongoose = require('mongoose');
const Users = require('../modals/usersModels'); // Ensure this path is correct
const bcrypt = require('bcrypt');

exports.getAllUsers = (req, res) => {
    Users.find()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};

exports.createUser = async (req, res) => {
    try {
        const existingUser = await Users.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // Adjust the salt rounds as needed

        const user = new Users({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword, // Store the hashed password
        });

        const result = await user.save();
        res.status(201).json(result);
        console.log("User created!");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await Users.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(204).send(); // No content
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Find the user by email
        const user = await Users.findOne({ email }); // Use Users instead of User
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare the provided password with the stored hashed password
        console.log("Stored password:", user.password);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // If login is successful
        res.status(200).json({ message: 'Login successful!', userId: user._id });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server error.' });
    }
};
