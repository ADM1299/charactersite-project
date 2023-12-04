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
        isFavorite: false,
        summary:'First Appearance: 1983 \\n Franchise: Mario \\n A famous plumber from the Mushroom Kingdom. \\n He is known for saving Princess Peach from the evil lord Bowser.'
    },
    {
        name:'Pikachu',
        description: 'Electric Mouse Pokemon',
        image: 'images/Pikachu.jpg',
        isFavorite: false,
        summary: 'First Appearance: 1996 \\n Franchise: Pokemon \\n The electric mouse Pokemon and the mascot of the Pokemon series. \\n Know for their powerful electric moves like Thunder Jolt and Thunder.'
    },
    {
        name: 'Fox',
        description: 'Superstar Pilot',
        image: 'images/Fox.jpg',
        isFavorite: false,
        summary: 'First Appearance: 1993 \\n Franchise: StarFox \\n Fox McCloud is the leader of the space mercenaries StarFox. \\n He is a young ace pilot with a strong sense of justice.' 
    },
    {
        name: 'Samus',
        description: 'Intergalactic Bounty Hunter',
        image: 'images/Samus.jpg',
        isFavorite: false,
        summary: 'First Appearance: 1986 \\n Franchise: Metroid \\n Samus Aran is a famous galactic bounty hunter feared across the galaxy. \\n She battles countless foes ranging from Space pirates to the dreaded Metroid.'  
    },
    {
        name: 'Captain Falcon',
        description: 'Part Time Bounty Hunter/Racer',
        image: 'images/Captain_Falcon.jpg',
        isFavorite: false,
        summary: 'First Appearance: 1990 \\n Franchise: F-Zero \\n A mysterious person known as the best racer in F-Zero and a renowned bounty hunter.' 
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
