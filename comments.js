// Create web server
// 2018-1-9 14:46:33
// --------------------------------------------------

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');
const checkLogin = require('../middlewares/check').checkLogin;

// POST /comments create a comment
router.post('/', checkLogin, function (req, res, next) {
    const author = req.session.user._id;
    const postId = req.fields.postId;
    const content = req.fields.content;

    // check parameters
    try {
        if (!content.length) {
            throw new Error('Please write comment content');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('back');
    }

    const comment = {
