// This is going to all of our users routes

const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database");

const User = require("../models/user");

// Authentication routes
// Register a new user
router.post("/register", (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.name,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.status(401).send("Invalid username or password");
    } else {
      res.json({ success: true, msg: "User registered" });
    }
  });
});

// login/authenticate
router.post("/authenticate", (req, res, next) => {
  // res.send('AUTHENTICATE');
  const username = req.body.username;
  const password = req.body.password;

  const errorMessage = "Bad credentials"

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: errorMessage });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        const jsonUser = {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email
        }
        // Use the JWT to create a valid JWT token
        // https://www.npmjs.com/package/jwt
        const token = jwt.sign(jsonUser, config.secret, {
          expiresIn: 604800
        });
        res.json({
          success: true,
          token: token,
          user: jsonUser,
          expiresIn: 604800
        });
      } else {
        return res.json({ success: false, msg: errorMessage });
      }
    });
  });
});

// Users' profile route.
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({ user: req.user });
  }
);

module.exports = router;
