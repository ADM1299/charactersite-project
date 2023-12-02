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
            else if (this.req.url === "/filter") {
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
            else {
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
       
        this.template = this.template.replace('*characters*', pageContent);
        return this.template
    }

    handleFilterPost() {
        
        return this.renderCharacterPage();
    }

    renderApplicationPage() {
        // read in the /template/applicationTemplate.html file.
        this.template = fs.readFileSync("./application/template/applicationTemplate.html").toString();
        let contentLinks = '';
        //Render Application Page Here
        this.appData.forEach(item => {
            contentLinks += `<div><a href=/application${item.url}> ${item.name} </a></div>`;
        });

        this.template = this.template.replace('*characters*', contentLinks);

        return this.template;

    }

    
    renderContentPage() {
        this.template = fs.readFileSync("./application/template/contentTemplate.html").toString(); // read in the /template/contentTemplate.html file.
        let pageContent = '';
        let item = '';
        let nextItem = '';
        

        
        for(let i = 0; i < 3; i++) {
            if (this.req.url === this.appData[i].url) {
                item = this.appData[i];
                if (i === 2) {
                    nextItem = this.appData[0];
                }
                else {
                    nextItem = this.appData[i+1];
                }
                
            }
        }

        

        pageContent += `<div><h1>${item.name}</h1><p>${item.desc}</p><img src='/${item.image}' width='300px' height='300px'><a href='.${nextItem.url}'>Next Page</a></div>`
        
        //Render Content Page Here
        this.template = this.template.replace('*content*', pageContent);
    }

    
    toggleFavorite() {

        console.log("Hello");
        if (this.appData.favorite) {
            this.favorite = false;
        }
        else {
            this.favorite = true;
        }
    }

    getCharacterPage() {
        this.renderCharacterPage();
        return this.template;
    }

    getApplicationPage() {
        this.renderApplicationPage();
        return this.template;
    }

    getContentPage() {
        this.renderContentPage();
        return this.template;
    }


}


module.exports = application;