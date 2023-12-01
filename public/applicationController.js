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
        

        
        this.appData.forEach (item => {
            pageContent += `<div><h1>${item.name}</h1><p>${item.description}</p><img src='${item.image}' width='300px' height='300px'/></div>`
        });
        
        //Render Content Page Here
        this.template = this.template.replace('*characters*', pageContent);
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