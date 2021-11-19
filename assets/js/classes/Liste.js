import {Article} from "./Article";

class Liste{
    constructor(){
        this.articles = {};
        this.parent = document.body;
        this.div = document.createElement("div");
        this.createDom();
        this.getData();


    }

    /**
     * Create element in DOM
     */
    createDom(){
        this.parent.prepend(this.div);
        this.div.id = "main";
        this.div.innerHTML =
            `
            <div id="main-list">
            <i class="fas fa-moon theme" data-value="0"></i>
            </div>
            `;

        /**
         * Change theme
         */
        const theme = this.div.querySelector(".theme");
        theme.addEventListener("click", () => {
            /**
             * Change to dark mode
             */
            if(theme.dataset.value === "0"){
                /**
                 * Change css theme variable
                 */
                document.querySelector(":root").style.setProperty("--bg-color-theme","--bg-color-black");
                document.body.style.animationName = "to-black";
                document.body.style.animationDuration = "2s";
                theme.className = "far fa-moon theme";
                theme.dataset.value = "1";
                window.setTimeout(()=> {
                    document.body.style.animationName = "";
                    document.body.style.animationDuration = "";
                    document.body.style.backgroundColor = "var(--bg-color-black)";
                    },1000);
            }

            /**
             * Change to white mode
             */
            else{
                document.querySelector(":root").style.setProperty("--bg-color-theme","--bg-color-white");
                document.body.style.animationName = "to-white";
                document.body.style.animationDuration = "2s";
                theme.dataset.value = "0";
                theme.className = "fas fa-moon theme";
                window.setTimeout(()=> {
                    document.body.style.animationName = "";
                    document.body.style.animationDuration = "";
                    document.body.style.backgroundColor = "var(--bg-color-white)";
                },1000);
            }
        })
    }

    /**
     * Get articles from external api and create Article object according to fetched data
     */
    getData(){
        const req = new XMLHttpRequest();
        req.open("GET", "http://api.mediastack.com/v1/news?access_key=0b0a4cd28b57879609a459f4811219a4&languages=fr")
        req.onload = () => {
            const datas = JSON.parse(req.responseText);
            let i = 0;
            /**
             * datas["data"] contain articles
             */
            for(let data of datas["data"]){
                this.articles[i] = new Article(data,this.div.querySelector("#main-list"));
                i++;
            }
        }
        req.send();
    }
}

export {Liste};
