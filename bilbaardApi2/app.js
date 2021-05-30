// Express application
// Built according to a tutorial here:
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs


const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


// Connect to mongoose database using our configs
// https://www.npmjs.com/package/mongoose
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});

const app = express();

const users = require('./routes/users');
const posts = require('./routes/psots');

const port = 3000;

// Use all the middlewares we'll be needing.
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
// Passport to use the JWT authentication methods.
app.use(passport.initialize());
app.use(passport.session());
// Set up passport according to our config
require('./config/passport')(passport);

// Include our base route handlers
app.use('/auth', users);
app.use('/posts', posts);

// We don't respond to the default handler.
app.get('/', (req, res) => {
    res.send('404: Not found');
});

// Start the server and start listening.
app.listen(port, () => {
    console.log('Server started on port: ' + port);
});