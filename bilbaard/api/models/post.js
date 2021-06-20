const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Create a user Schema
const PostSchema = mongoose.Schema({
    userId: {
        type: String,
        required : true
    },
    text: {
        type: String,
        required : true
    },
});

const Post = module.exports = mongoose.model('Post', PostSchema);

// Create two basic functions in this file, get user by id and by username 

module.exports.getPostById = function(id, callback) {
    Post.findById(id, callback);
}

module.exports.getPosts = function(callback) {
    Post.find({}, callback);
}

module.exports.addPost = function(newPost, callback) {
    newPost.save(callback)
}

module.exports.deletePost = function(postId, userId, callback) {
    Post.findById(postId, function (err, post) {
        if (userId === post.userId) {
            Post.deleteOne(post, callback)
        } else {
            callback("Only the owner can delete a post.")
        }
    })
}