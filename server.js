// week 19 day 2 01:00:00 Always require and configure near the top
/* require('dotenv').config() is how we access our
./config/database file to connect to mongoose in our server.  */
require('dotenv').config();//////
// Connect to the database//////
require('./config/database');///
///////////////////////////////
//18 day 1 //basic express template 
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const port = process.env.PORT || 3001;

const app = express();

//can use dev or tiny
app.use(logger('dev'));
//to send json from react app to our express server
//so the express server accepts the json and then pt it in req.body for me.
app.use(express.json());




// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
//path.join() what type of device the users and what type of device the server reading.
///////////////////__dirname is build in variable name
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
//reason to static build folder beacsue the build folder is the finish production/ ready version of all the code.
/* when we build it take the public src folder together and builds them right into the build folder and the build
folder. the build is the productipon ready code. static() is a express method to serve w.e in it. */
app.use(express.static(path.join(__dirname, 'build')));

// Put API routes here, before the "catch all" route 
//api



// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
//index.html is where the react APP is inside the script tag!!
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



app.listen(port, function () {
    console.log(`Express app running on port ${port}`)
});