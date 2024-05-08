const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./config/database');
const userRouter = require('./routes/api/user.js');  // Renamed the router variable

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());

// Configure static and catch all routes
app.use(express.static(path.join(__dirname, 'build')));
app.use('/api/users', userRouter); // Use the user router for API routes

// Serve React app
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log(`Express app running on port ${port}`);
});
