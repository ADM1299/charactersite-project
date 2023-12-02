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
router.get('/favorite', function(req, res, next) {
    // Needs to be implemented
    // This code is meaningless at the moment.
    appController = new applicationController(req);
    html = appController.getFavoritePage(req);
    res.send(html);
});

router.get('/*', function(req, res, next) {
    appController = new applicationController(req);
    html = appController.getFilterPage(req);
    res.send(html);
});


module.exports = router;