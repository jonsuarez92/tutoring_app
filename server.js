const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
// const cookie = require('cookie-parser')

const cors = require('cors');
require('dotenv').config();
require('./config/database');

const app = express();
app.use(cors(
    // {
    //     origin: "http://localhost:3001",
    //     credentials: true
    // }
));
// app.use(cookie)
app.use(logger('dev'));
app.use(express.json());


// Configure static and catch all routes
app.use(express.static(path.join(__dirname, 'build')));


app.use('/api/users', require('./routes/api/user.js')); // Use the user router for API routes

// Serve React app
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log(`Express app running on port ${port}`);
});
