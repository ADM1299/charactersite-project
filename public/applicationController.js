const fs = require('fs');
const path = require("path");
global.characterData = JSON.parse(fs.readFileSync("./public/data/characterData.json"));

class application {
    constructor(req) {
        this.req = req;
        this.appData = global.characterData;
    }

    showCharacterDetails(characterName) {
        let character;
        for (let i = 0; i < this.appData.length; i++) {
            if (this.appData[i].name === characterName) {
                character = this.appData[i];
                break;
            }
        }
        if (!character) return;
        
        return JSON.stringify(character);
    }

    renderCharacterPage() {
        this.template = fs.readFileSync("./public/templates/character.html").toString();
        let pageContent = '';

        pageContent += `
        <div id="wrapper">
        <header>
            <h1>
                Choose Your Character
            </h1>
        </header>
        <nav>
            <ul>
                <li>
                    <a href="/">
                        Home
                    </a>
                </li>
                <li>
                    <a href="/favorites">
                        Favorite(s)
                    </a>
                </li>
            </ul>
        </nav>
    
        <nav>
            <ul>
                <li>
                    <a href="/">All</a>
                </li>
                <li>
                    <a href="/filter1">Pokemon</a>
                </li>
                <li>
                    <a href="/filter">Not Pokemon</a>
                </li>
            </ul>
        </nav>
        <main>
        `;

        this.appData.forEach(character => {
            let displayCard = this.req.url === "/filter1" && character.isPokemon ||
                              this.req.url === "/filter" && !character.isPokemon ||
                              this.req.url === "/";
        
            if (displayCard) {
                pageContent += `
                    <div class="card" onclick="showCharacterDetails('${character.name}')">
                        <img class="card__img" src="${character.image}" alt="Picture of ${character.name}">
                        <div class="card-body">
                            <h5 class="card-title">${character.name}</h5>
                            <p class="card-text">${character.description}</p>
                            <button class="favorite-button ${character.isFavorite ? "favorite" : ""}" onclick="toggleFavoriteFromCard('${character.name}', event)">${character.isFavorite ? "Remove from favorites" : "Add to favorites"}</button>
                        </div>
                    </div>
                `;
            }
        });

        pageContent += `
        </main>
            <footer>
                Copyright &copy;Distributed Web Design 2023
                <br/>
                <a href="mailto:Sa12499@georgiasouthern.edu">
                    Samuel_Adeniyi
                </a>
                <a href="mailto:al20877@georgiasouthern.edu">
                    Aaron_Lee
                </a>
                <a href="mailto:am38948@georgiasouthern.edu">
                    Alexander_May
                </a>
            </footer>
        </div>
        `;

        let modalHTML = `
        <div class="modal-container">
            <div class="modal fade modal-dialog" role="document" id="characterDetailsModal" tabindex="-1" aria-labelledby="characterDetailsModalLabel" aria-hidden="true">
                <div class="modal-content">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="characterDetailsModalLabel">
                        Character Details
                    </h5>
                    <span aria-hidden="true">
                        &times;
                    </span>
                </div>
                <div class="modal-body">
                    <h2 id="characterName"></h2>
                    <img id="characterImage" class="img-fluid" alt="Picture of " />
                    <p id="characterDescription"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">
                        Close
                    </button>
                    <button type="button" class="btn btn-default btn-next">
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
`;

        pageContent += modalHTML;

        this.template = this.template.replace('{{ characterCards }}', pageContent);
        return this.template;
    }

    toggleFavorite(characterName) {
        const character = this.appData.find(c => c.name === characterName);
        if (!character) return;
        character.isFavorite = !character.isFavorite;
    }

    getFavorites() {
        return this.appData.filter(c=> c.isFavorite);
    }

    getCharacterPage() {
        return this.renderCharacterPage();
    }

    //Returns a favorite page that includes all characters marked as favorites
    getFavoritePage() {
        const favorites = this.getFavorites();
    
        let pageContent = '<div id="favorites">';
        favorites.forEach(character => {
            pageContent += `
                <div class="card favorite-card" onclick="showCharacterDetails('${character.name}')">
                    <img class="card__img" src="${character.image}" alt="Picture of ${character.name}">
                    <div class="card-body">
                        <h5 class="card-title">${character.name}</h5>
                        <p class="card-text">${character.description}</p>
                    </div>
                </div>
            `;
        });
        pageContent += '</div>';
    
        pageContent += '<button onclick="window.location.href=\'/\'">Return Home</button>';
    
        return pageContent;
    }

    getApplicationPage() {
        return this.template;
    }

    getContentPage() {
        return this.template;
    }
}

module.exports = application;