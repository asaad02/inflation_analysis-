const express = require('express');
const getIndex = require('../controller/index.controller');
const {getPosts} = require('../controller/posts.controller');
const {getTweets} = require('../controller/tweets.controller');

/**
 * Express router is a pluggable app that can be registered to the express application
 * Enables us to create modular routes
 */

// eslint-disable-next-line new-cap
const router = express.Router();

// Just a simple route to test health of the server
router.get('/', getIndex);

// All routes involving Reddit posts
router.get('/posts', getPosts);

// All routes involving Twitter tweets
router.get('/tweets', getTweets);

module.exports = router;
