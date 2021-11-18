import * as timeDifference from "time-difference-js";
import {getTimeDiff} from "time-difference-js";
const isImageUrl = require('is-image-url');

class Article{
    constructor(data,parent){
        this.data = data;
        this.parent = parent;
        this.div = document.createElement("div");
        this.expand = false;
        this.createDom();

    }

    createDom(){
        console.log(this.data);
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
            <div class="title">${this.data.title}</div>
            <div class="description">${this.data.description}</div>
            <div class="date">${this.data.published_at}</div>
            `
        if(this.data.image){
            if(isImageUrl(this.data.image)){
                if(!this.data.image.includes("www.bladi.net")){
                    this.div.innerHTML += `<img src="${this.data.image}" alt="${this.data.title}-image">`;
                }
            }
        }

        this.setEventExpand();

    }

    setEventExpand(){
        this.expand = false;

        document.addEventListener("click", (e) => {
            let targetElement = e.target;
            do {
                if (targetElement === (this.div)) {
                    if(!this.expand){
                        this.expandDom();
                    }
                    this.expand = !this.expand;
                    return;
                }
                else{
                    this.retractDom();
                }
                targetElement = targetElement.parentNode;
            } while (targetElement);
            this.div.style.zIndex = "1";
        })
    }

    cleanData(){
        if(this.data.title.length > 65){
            this.data.title = this.data.title.substr(0,58) + "...";
        }
        if(this.data.description.length > 100){
            this.data.description = this.data.description.substr(0,100) + "...";
        }

    }

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

    retractDom() {
        this.div.classList.add("article");
        this.div.classList.remove("expand");
        this.div.style.zIndex = "1";
        this.div.innerHTML =
            `
            <div class="sub-title"><h3>${this.data.author}</h3></div>
            <div class="title">${this.data.title}</div>
            <div class="description">${this.data.description}</div>
            <div class="date">${this.data.published_at}</div>
            `;
        if(this.data.image){
            if(isImageUrl(this.data.image)){
                if(!this.data.image.includes("www.bladi.net")){
                    this.div.innerHTML += `<img src="${this.data.image}" alt="${this.data.title}-image">`;
                }
            }
        }

        this.setEventExpand();
    }

    expandDom() {
        this.div.style.zIndex = "10";
        this.div.classList.remove("article");
        this.div.classList.add("expand");
        this.div.innerHTML =
            `
            <div></div>
            `
    }
}

export {Article};