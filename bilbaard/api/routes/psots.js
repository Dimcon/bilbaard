// This is going to all of our users routes



const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database");

const User = require("../models/user");
const Post = require("../models/post");


// Routes to handle posts. GET and POST
// Submit new psots
router.post("/newPost",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
  let newPost = new Post({
    userId: req.body.userId,
    text: req.body.text,
  });
    User.findById(req.body.userId,
        function (err, user) {
        if (err) {
            res.status(401).send("User not found");
        }
        if (user.role !== 'admin') {
            res.status(401).send("Only admins can create posts.");
            return
        }
        Post.addPost(
            newPost,
            (err, post) => {
                if (err) {
                    res.status(401).send("Post could not be saved");
                } else {
                    res.json({ success: true, msg: "Post saved." });
                }
            });
        })
});

// Delete posts

router.post("/deletePost",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
      Post.deletePost(req.body.postId,req.body.userId, function(err) {
          if (err) {
              res.status(401).send("Only the owner can delete a post");
          } else {
              res.json({ success: true, msg: "Post deleted." });
          }
      })
});

// Get posts
router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Post.getPosts((err, posts) => {
            res.json({ posts: posts });
    })
  }
);

module.exports = router;
