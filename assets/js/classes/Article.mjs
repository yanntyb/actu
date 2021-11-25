import * as timeDifference from "time-difference-js";
import {getTimeDiff} from "time-difference-js";
const isImageUrl = require('is-image-url');

class Article{
    constructor(data,parent){
        this.data = data;
        this.parent = parent;
        this.description = "";
        this.title = "";
        this.div = document.createElement("div");
        this.expand = false;
        this.createDom();

    }

    /**
     * Create element in DOM
     */
    createDom(){
        this.parent.appendChild(this.div);
        this.div.className = "article";
        if(!this.data.author){
            this.data.author = "Inconnu";
        }
        if(!this.data.image){
            this.data.image = null;
        }
        this.cleanData();
        this.cleanDate();
        this.div.innerHTML =
            `
            <div class="sub-title"><h3>${this.data.author}</h3></div>
            <div class="title">${this.title}</div>
            <div class="description">${this.description}</div>
            <div class="date">${this.data.published_at}</div>
            `
        /**
         * Add an image to the element div if theire is an image to be added
         */
        if(this.data.image){
            if(isImageUrl(this.data.image)){
                if(!this.data.image.includes("www.bladi.net")){
                    this.div.innerHTML += `<img src="${this.data.image}" alt="${this.data.title}-image">`;
                }
            }
        }

        this.setEventExpand();

    }

    /**
     * Set event listener on the element div to expand it or reverse expand it
     */
    setEventExpand(){
        document.addEventListener("click", (e) => {
            let targetElement = e.target;
            if (targetElement === this.div || document.body){
                if(!this.expand && targetElement === this.div){
                    this.div.style.zIndex = "10";
                    this.expandDom();
                }
                else if(targetElement === this.div || document.body){
                    this.div.style.zIndex = "1";
                    this.retractDom();
                }
            }
        })
    }

    /**
     * Clen data to match with the "maquette que Jerome nous a fournie"
     */
    cleanData(){
        if(this.data.title.length > 65){
            this.title = this.data.title.substr(0,58) + "...";
        }
        else{
            this.title = this.data.title;
        }
        if(this.data.description.length > 100){
            this.description = this.data.description.substr(0,100) + "...";
        }
        else{
            this.description = this.data.description;
        }

    }

    /**
     * Clean date to match with the "maquette que Jerome nous a fournie"
     */
    cleanDate(){
        const translate = {
            "months": "mois",
            "month" : "moi",
            "Hours" : "heures",
            "Hour": "heure",
            "years": "années",
            "year": "année",
            "second": "seconde",
            "seconds": "seconds",
            "minutes": "minutes",
            "minute": "minute",
            "Days": "jour"
        }
        let date = this.data.published_at;
        const year = date.substr(0,4);
        const month = date.substr(5,2);
        const day = date.substr(8,2);
        const hour = date.substr(11,2);
        const min = date.substr(14,2);
        const sec = date.substr(17,2);

        const pusblish_date = new Date(year,month,day,hour,min,sec);

        const result = getTimeDiff(pusblish_date);
        this.data.published_at = "Il ya " + result.value + " " + translate[result.suffix];
    }

    /**
     * Modify element's div to be retracted
     */
    retractDom() {
    this.div.className.includes("expand")
    this.div.classList.add("article");
    this.div.classList.remove("expand");
    this.div.style.zIndex = "1";
    this.div.innerHTML =
        `
    <div class="sub-title"><h3>${this.data.author}</h3></div>
    <div class="title">${this.title}</div>
    <div class="description">${this.description}</div>
    <div class="date">${this.data.published_at}</div>
    `;
    if(this.data.image){
        if(isImageUrl(this.data.image)){
            if(!this.data.image.includes("www.bladi.net")){
                this.div.innerHTML += `<img src="${this.data.image}" alt="${this.data.title}-image">`;
            }
        }
    }

    this.expand = false;

    }

    /**
     * Modify element's div to be expanded
     */
    expandDom() {
        this.div.style.zIndex = "10";
        this.div.classList.remove("article");
        this.div.classList.add("expand");
        this.div.innerHTML =
            `
            <div id="expanded-article">
                <h1>${this.data.title}</h1>
                <div id="content">
                    <div id="desc">${this.data.description}</div>
                </div>
                <div id="author">Publié par ${this.data.author} ${this.data.published_at}</div>
            </div>
            `
        if(this.data.image){
            if(isImageUrl(this.data.image)){
                if(!this.data.image.includes("www.bladi.net")){
                    this.div.querySelector("#content").innerHTML += `<img src="${this.data.image}" alt="${this.data.title}-image">`;
                    this.div.querySelector("#content").className = "with-img";
                }
            }
        }
        this.expand = true;
    }
}

export {Article};