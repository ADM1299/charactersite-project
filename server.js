const express = require('express');
const path = require('path');
const app = express();
const port = 3200;

app.use(express.static(path.join(__dirname, 'public')));

//API for characters
const characters = [
    {
        name: 'Mario',
        description: 'Part Time Plumber',
        image: 'images/Mario.jpg',
        //Implement boolean to track for if character is set as favorite
        isFavorite: false
    },
    {
        name:'Pikachu',
        description: 'Electric Mouse Pokemon',
        image: 'images/Pikachu.jpg',
        isFavorite: false
    },
    {
        name: 'Fox',
        description: 'Superstar Pilot',
        image: 'images/Fox.jpg',
        isFavorite: false
    },
    {
        name: 'Samus',
        description: 'Intergalactic Bounty Hunter',
        image: 'images/Samus.jpg',
        isFavorite: false
    },
    {
        name: 'Captain Falcon',
        description: 'Part Time Bounty Hunter/Racer',
        image: 'images/Captain_Falcon.jpg',
        isFavorite: false
    },
];

app.get('/api/characters', (req, res) => {
    res.json(characters);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Home.html'));
});

app.get('/api/characters/:name/favorite', async (req, res) => {
    const character = characters.find(c => c.name === req.params.name);
    if (character) {
        res.json({ favorite: character.favorite });
    } else {
        res.status(404).send('Character not found');
    }
});

app.post('/api/characters/:name/favorite', express.json(), async (req, res) => {
    const character = characters.find(c => c.name === req.params.name);
    if (character) {
        character.favorite = req.body.favorite;
        res.json({ favorite: character.favorite });
    } else {
        res.status(404).send('Character not found');
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});