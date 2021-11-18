import {Article} from "./Article";

class Liste{
    constructor(){
        this.articles = {};
        this.parent = document.body;
        this.div = document.createElement("div");
        this.createDom();
        this.getData();


    }

    createDom(){
        this.parent.prepend(this.div);
        this.div.id = "main";
        this.div.innerHTML =
            `
            <div id="main-list"></div>
            `
    }

    getData(){
        const req = new XMLHttpRequest();
        req.open("GET", "http://api.mediastack.com/v1/news?access_key=0b0a4cd28b57879609a459f4811219a4&languages=fr")
        req.onload = () => {
            const datas = JSON.parse(req.responseText);
            let i = 0;
            for(let data of datas["data"]){
                this.articles[i] = new Article(data,this.div.querySelector("#main-list"));
                i++;
            }
            console.log(this.articles);
        }
        req.send();
    }
}

export {Liste};
