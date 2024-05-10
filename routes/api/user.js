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
    const token = jwt.sign({ username: user.name }, process.env.key, { expiresIn: '1h' })
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
        const token = jwt.sign({ username: user.name }, process.env.key, { expiresIn: '1h' });
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
            html: `<p>Click <a href="http://yourdomain.com/api/users/forgotpassword/${token}">here</a> to reset your password.</p>`
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

module.exports = router;
