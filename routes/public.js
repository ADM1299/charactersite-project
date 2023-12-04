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

router.get('/favorites', function(req, res, next) {
    appController = new applicationController(req);
    html = appController.getFavoritePage(req);
    res.send(html);
});

router.get('/favorites/:index', function(req, res) {
    var appController = new applicationController(req);
    var favorites = appController.getFavorites();
    var index = req.params.index;
    if (index >= 0 && index < favorites.length) {
        res.send(JSON.stringify(favorites[index]));
    } else {
        res.status(404).send('Not found');
    }
});

router.get('/characterData/:name', function(req, res, next) {
    appController = new applicationController(req);
    const characterData = appController.showCharacterDetails(req.params.name);
    res.send(characterData);
});

router.get('/toggleFavorite/:characterName', function(req, res, next) {
    appController = new applicationController(req);
    appController.toggleFavorite(req.params.characterName);
    res.send('OK');
});

router.get('/*', function(req, res, next) {
    appController = new applicationController(req);
    html = appController.getCharacterPage(req);
    res.send(html);
});


module.exports = router;