const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
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
        return res.status(201).json({ status: true, message: "User registered" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not registered" });
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        return res.status(400).json({ message: "Password incorrect" });
    }
    const token = jwt.sign({ username: user.name }, process.env.KEY, { expiresIn: '1h' })
    // res.cookie('token', token, { httpOnly: true, maxAge: 360000 })
    return res.json({ status: true, message: 'login successfully' })

})

router.post('/FogotPassword', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not registered" });
        }
        const token = jwt.sign({ username: user.name }, process.env.KEY, { expiresIn: '1h' });
        console.log("Generated token:", token); // Log the generated token for debugging

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jon.suarez92@gmail.com',
                pass: 'shiq xpgg wlfw wzgr'
            }
        });

        var mailOptions = {
            from: 'jon.suarez92@gmail.com',
            to: email,
            subject: 'Reset Password',
            html: `<p>Click <a href="http://localhost:3000/resetPassword/${token}">here</a> to reset your password.</p>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error("Error sending email:", error); // Log the error for debugging
                return res.json({ message: "error sending email" });
            } else {
                console.log("Email sent:", info.response); // Log the email response for debugging
                return res.json({ status: true, message: "email sent" });
            }
        });
    } catch (err) {
        console.error("Database error:", err); // Log any database errors for debugging
        return res.status(500).json({ message: "Server error" });
    }
})

router.post('/resetPassword/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        // Verify the token and extract the userId
        const decoded = jwt.verify(token, process.env.KEY);
        const userId = decoded.userId;

        // Hash the new password
        const hashPassword = await bcrypt.hash(password, 10);

        // Update the user's password in the database
        await User.findByIdAndUpdate(userId, { password: hashPassword });

        // Return a success message
        return res.json({ status: true, message: "Password updated successfully" });
    } catch (err) {
        // If there's an error (e.g., token invalid or expired), return an error message
        return res.status(400).json({ status: false, message: "Invalid or expired token" });
    }
});


module.exports = router;
