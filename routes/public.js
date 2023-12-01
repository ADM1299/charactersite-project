var express = require('express');

var router = express.Router();
const path = require("path");

var applicationController = require('../public/applicationController');

// This gives us the main page
router.get('/', function(req, res, next) {
    appController = new applicationController(req);
    html = appController.getCharacterPage(req);
    res.send(html);
});

// This will handle all of our individual pages
router.get('/*', function(req, res, next) {
    // Needs to be implemented
});


module.exports = router;