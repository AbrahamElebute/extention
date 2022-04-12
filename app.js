const InputBtn = document.querySelector("#input-btn") 
const InputEl = document.querySelector(".input-el") 
const  ulEl = document.querySelector("#ul-el")
const  restBtn = document.querySelector(".rest")
document.addEventListener("DOMContentLoaded", getLinks);

function createLink(argument){
    function dateFunc() {
        return new Date().toLocaleString();
}
    // li div
        const NewLiTag = document.createElement("li") 
        NewLiTag.className = "link";
    // date div
        const NewDateDiv = document.createElement("div") 
        NewDateDiv.className = "date";
        NewDateDiv.textContent = `date: ${dateFunc()}`
    // container div
        const NewConDiv = document.createElement("div") 
    // A tag div
        const NewATag = document.createElement("a") 
        NewATag.title = argument
        NewATag.href = argument;
        NewATag.target = "_blank"
        NewATag.textContent = argument
        saveLocalgetLinks([argument, dateFunc()]);
        InputEl.value = " "
    // button div
        const NewButtonTag = document.createElement("button") 
        NewButtonTag.classList = "del"
    // img div
        const NewImgTag = document.createElement("img") 
        NewImgTag.src = "images/bin.png";
        NewImgTag.alt = "delete"


        ulEl.prepend(NewLiTag);
        NewLiTag.appendChild(NewDateDiv);
        NewLiTag.appendChild(NewConDiv);
        NewConDiv.appendChild(NewATag);
        NewConDiv.appendChild(NewButtonTag );
        NewButtonTag.appendChild(NewImgTag);
}

InputBtn.addEventListener("click",function() {
    if (window.event.ctrlKey) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                createLink(tabs[0].url)

        })
    }
        else {
            createLink(InputEl.value)

    }
})
ulEl.addEventListener("click",function(e){
    const item = e.target;
    if(item.classList.contains("del")){
        const link = item.parentElement.parentElement;
        link.remove()
        removeLocalLink(link)
    }
})
function saveLocalgetLinks(link) {
    // CHECK  if Links are present in local storage

    let Links;
    if (localStorage.getItem("Links") === null) {
            Links = [];
    } else {
            Links = JSON.parse(localStorage.getItem("Links"));
    }

    Links.push(link);

    localStorage.setItem("Links", JSON.stringify(Links));
}
function getLinks() {

    // CHECK  if Links are present in local storage

    let Links;
    if (localStorage.getItem("Links") === null) {
            Links = [];
    } else {
            Links = JSON.parse(localStorage.getItem("Links"));
    }

    Links.forEach(function (link) {
             // li div
        const NewLiTag = document.createElement("li") 
        NewLiTag.className = "link";
    // date div
        const NewDateDiv = document.createElement("div") 
        NewDateDiv.className = "date";
        NewDateDiv.textContent = `date: ${link[1]}`;
    // container div
        const NewConDiv = document.createElement("div") 
    // A tag div
        const NewATag = document.createElement("a") 
        NewATag.title = link[0];
        NewATag.href = link[0];
        NewATag.target = "_blank"
        NewATag.textContent = link[0];
        InputEl.value = " "
    // button div
        const NewButtonTag = document.createElement("button") 
        NewButtonTag.classList = "del"
    // img div
        const NewImgTag = document.createElement("img") 
        NewImgTag.src = "images/bin.png";
        NewImgTag.alt = "delete"


        ulEl.prepend(NewLiTag);
        NewLiTag.appendChild(NewDateDiv);
        NewLiTag.appendChild(NewConDiv);
        NewConDiv.appendChild(NewATag);
        NewConDiv.appendChild(NewButtonTag );
        NewButtonTag.appendChild(NewImgTag);

    });
}
function removeLocalLink(link){
    let Links;
    if (localStorage.getItem("Links") === null) {
            Links = [];
    } else {
            Links = JSON.parse(localStorage.getItem("Links"));
    }
    var linkIndex = link.textContent;
    Links.splice(Links.indexOf(linkIndex), 1);
    localStorage.setItem("Links", JSON.stringify(Links));
}
restBtn.addEventListener("dblclick",function(){
    ulEl.textContent = " "
    localStorage.clear()
})