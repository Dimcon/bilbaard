// Express application
// Built according to a tutorial here:
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs


const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const https = require('https')
const config = require('./api/config/database');
const helmet = require("helmet")
const morgan = require("morgan")
const fs = require('fs')
const session = require('express-session')




const app = express();

app.use(helmet())
app.use(
    helmet.frameguard({
        action: "sameorigin",
    })
)


// Use all the middlewares we'll be needing.
const corsOptions = {
    origin: `http://localhost:4200`,
    methods:['GET', 'PUT', 'POST', 'DELETE']
}
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'THIS IS ALL A SIMULATION?', cookie: { maxAge: 60000 }}))
app.use(bodyParser.json({ extended: false }))
app.use(cookieParser());
// app.use(csurf({ cookie: true }));
// // const csrfProtection = csurf({
// //     sessionKey: 'THIS IS ALL A SIMULATION?',
// //     cookie: true
// // })
//
//
//
//
// app.use(function(req, res, next) {
//     const xsrf = req.csrfToken()
//     res.cookie("XSRF-TOKEN", xsrf);
//     res.setHeader("XSRF-TOKEN", xsrf)
//     res.locals.csrfToken = xsrf;
//     return next();
// });
// app.get('/', (req, res) => {
//     const cookie = res.getHeader("XSRF-TOKEN")
//     let origheader =  res.getHeader("set-cookie")
//     let header = res.getHeader("set-cookie")[0].split("=")[1].split(";")[0]
//     res.json({ success: true, msg: "Got CSRF", cookie: cookie, csrfData: header });
// });

// Passport to use the JWT authentication methods.
app.use(passport.initialize());
app.use(passport.session());

// Set up passport according to our config
require('./api/config/passport')(passport);





// create a write stream (in append mode)
const  accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})

app.use(morgan('combined', {stream: accessLogStream}))





const users = require('./api/routes/users');
const posts = require('./api/routes/psots');

// Include our base route handlers
app.use('/auth', users);
app.use('/posts', posts);

const port = 3000;


// Connect to mongoose database using our configs
// https://www.npmjs.com/package/mongoose
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app).listen(port, () => {
    console.log('Server started on port: ' + port);
});
