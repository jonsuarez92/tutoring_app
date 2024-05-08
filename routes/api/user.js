const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../../models/Users');

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashpassword
        });

        await newUser.save();
        return res.status(201).json({ message: "User registered" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
