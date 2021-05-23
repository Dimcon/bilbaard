// This is our main server entry point file
// First thing is to bring in all the modules we want, all our dependancies

const express = require('express');
// The path we didnt install with dependancies because its a core module
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');



// Connect to database
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });

// On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// Check if theres a database error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});

// Initialise our app variable with express
const app = express();

// Use the express router because all the user routes must go in a separate file
const users = require('./routes/users');
const posts = require('./routes/psots');

// Create a variable for the port we want to use 
const port = 3000;

// Add in the cors middleware which allows to make a request to our API from a different domain name, by default they will get blocked if they tried to do certain requests
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// bodyParser parsers incoming request bodies so when you submit a form or something like that you can grab the data 
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


// Anything that is localhost:3000 will go to that users file 
app.use('/auth', users);
app.use('/posts', posts);

// Create a route so localhost:3000 does not display Cannot GET / until it goes to fetch the index.html file later
app.get('/', (req, res) => {
    res.send('Invalid endpoint yah bish');
});

// To have the server refresh to load the webpage cancel server and use command npm install -g nodemon then after installation use command nodemon 

// Take the app variable and call listen which is going to listen on any port we pass in 
// Then we can use a call-back (a callback is a function that is to be excuted after another function has finished executing)
app.listen(port, () => {
    console.log('Server started on port: ' + port);
});