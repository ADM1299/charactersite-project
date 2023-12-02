const fs = require('fs');
const path = require("path");

class application {

    constructor(req) {
        this.req = req;
        this.appData = JSON.parse(fs.readFileSync("./public/data/characterData.json"));  //read in the /data/applicationData.json file.
    }

    renderCharacterPage() {
        this.template = fs.readFileSync("./public/templates/character.html").toString();
        let pageContent = '';
        
        pageContent += this.renderTopOfPage();

        this.appData.forEach (character => {
            pageContent += `
                    <div class="card">
                        <img class="card__img" src="${character.image}" alt="Picture of ${character.name}">
                        <div class="card-body">
                            <h5 class="card-title">${character.name}</h5>
                            <p class="card-text">${character.description}</p>
                            <button class="favorite-button ${character.isFavorite ? "favorite" : ""}" >${character.isFavorite ? "Remove from favorites" : "Add to favorites"}</button>
                        </div>
                    </div>
                `;
        });

        this.appData.forEach (character => {
            pageContent += `
            <div class="modal fade" id="characterDetailsModal" tabindex="-1" role="dialog" aria-labelledby="characterDetailsModalLabel" aria-hidden="true">
                     <div class="modal-dialog" role="document">
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
                                 <h2 id="characterName">${character.name}</h2>
                                 <img id="${character.image}" class="img-fluid" alt="Picture of ${character.name}" />
                                 <p id="characterDescription">${character.summary}</p>
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
                 </div>`;
        });

        pageContent += this.renderBottomOfPage();
       
        this.template = this.template.replace('*characters*', pageContent);
        return this.template
    }

    renderFilterPage() {
        this.template = fs.readFileSync("./public/templates/filter.html").toString();
        let pageContent = '';
        
        pageContent += this.renderTopOfPage();

        this.appData.forEach (character => {
            if (this.req.url === "/filter1") {
                if (character.isPokemon) {
                    pageContent += `
                    <div class="card">
                        <img class="card__img" src="${character.image}" alt="Picture of ${character.name}">
                        <div class="card-body">
                            <h5 class="card-title">${character.name}</h5>
                            <p class="card-text">${character.description}</p>
                            <button class="favorite-button ${character.isFavorite ? "favorite" : ""}" >${character.isFavorite ? "Remove from favorites" : "Add to favorites"}</button>
                        </div>
                    </div>
                `;
                }
            }
            else if (this.req.url === "/filter2") {
                if (!character.isPokemon) {
                    pageContent += `
                    <div class="card">
                        <img class="card__img" src="${character.image}" alt="Picture of ${character.name}">
                        <div class="card-body">
                            <h5 class="card-title">${character.name}</h5>
                            <p class="card-text">${character.description}</p>
                            <button class="favorite-button ${character.isFavorite ? "favorite" : ""}" >${character.isFavorite ? "Remove from favorites" : "Add to favorites"}</button>
                        </div>
                    </div>
                `;
                }
            }
           
        });

        this.appData.forEach (character => {
            pageContent += `
            <div class="modal fade" id="characterDetailsModal" tabindex="-1" role="dialog" aria-labelledby="characterDetailsModalLabel" aria-hidden="true">
                     <div class="modal-dialog" role="document">
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
                                 <h2 id="characterName">${character.name}</h2>
                                 <img id="${character.image}" class="img-fluid" alt="Picture of ${character.name}" />
                                 <p id="characterDescription">${character.summary}</p>
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
                 </div>`;
        });

        pageContent += this.renderBottomOfPage();
       
        this.template = this.template.replace('*characters*', pageContent);
        return this.template
    }

    renderTopOfPage() {
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
                    <a href="/filter2">Not Pokemon</a>
                </li>
            </ul>
        </nav>
        <main>
            
        `;
        return pageContent;
    }

    renderBottomOfPage() {
        let pageContent = '';
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
        return pageContent;
    }

    toggleFavorite() {
        if (this.appData.favorite) {
            this.favorite = false;
        }
        else {
            this.favorite = true;
        }
    }

    getFilterPage() {
        this.renderFilterPage();
        return this.template;
    }

    getCharacterPage() {
        this.renderCharacterPage();
        return this.template;
    }
}

module.exports = application;