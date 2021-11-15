var Categories = [];
var CategoryId;
var Position;
const filtroStatus = document.getElementsByClassName("filtroStatus");

document.addEventListener("DOMContentLoaded", () => {
    // console.log(Categories);
    var quoteInfo = document.getElementById("content-products").innerHTML;

    var template = Handlebars.compile(quoteInfo);
    var quoteData = template({
        "products": [{
                "name": "Cassels Milk Stou",
                "description": "Cassels & Sons Brewing. Cerveza porter y stout.",
                "price": 75000,
                "img": "cassels.png",
                "filterId": 1
            },
            {
                "name": "Camba Pale Ale",
                "description": "La Souche Franc-Bois d’hiver. Cerveza pale.",
                "price": 85300,
                "img": "camba.png",
                "filterId": 2
            },
            {
                "name": "Votus Nº 001",
                "description": "India Pale Ale del año 2019. Nº 001 Red IPA.",
                "price": 75000,
                "img": "votus.png",
                "filterId": 3
            },
            {
                "name": "Prairie Artisian",
                "description": "Ales Prairie Noir Whiskey Barrel Aged Imperial Stout 12oz.",
                "price": 85300,
                "img": "prairie-artisian.png",
                "filterId": 1
            },
            {
                "name": "Lost Abbey",
                "description": "The Lost Abbey Citrus Sin American Wild Ale 750ml.",
                "price": 75000,
                "img": "lost-abbey.png",
                "filterId": 2
            },
            {
                "name": "Prairie",
                "description": "Prairie Artisa Ales Paradise Imperial Stout 12oz.",
                "price": 85300,
                "img": "prairie.png",
                "filterId": 3
            },
            {
                "name": "Redrice",
                "description": "Hitachino Nest Beer Red Rice Ale 330ml.",
                "price": 85300,
                "img": "redrice.png",
                "filterId": 1
            },
            {
                "name": "Cascade",
                "description": "Cascade Brewing 2017 Brunch Line BA NORTHWEST Sour Ale.",
                "price": 175000,
                "img": "cascade.png",
                "filterId": 2
            },
            {
                "name": "Topa Topa",
                "description": "Topa Topa BREWING CO. 5th Year Anniversary clear Ipa 16oz.",
                "price": 85300,
                "img": "topa.png",
                "filterId": 3
            },
            {
                "name": "Mira Brune Nº 6",
                "description": "Brown Ale, Brown Mira American Style.",
                "price": 375000,
                "img": "mira.png",
                "filterId": 1
            }
        ]
    });

    document.getElementById("quoteData").innerHTML += quoteData;

    // Convert number to price
    let price = document.querySelectorAll(".price");
    for (let i = 0, len = price.length; i < len; i++) {
        let num = Number(price[i].innerHTML)
            .toLocaleString('en');
        price[i].innerHTML = "$" + num;
    }

    localCategory();
    cleanCategories();
    countFilter();
});

function addCategory($event) {

    this.CategoryId = $event.target.value;
    this.Position = this.Categories.indexOf(this.CategoryId);
    // console.log("Este es el valor de la categoria: ", this.CategoryId);
    if (this.Position == -1) {
        this.Categories.push(this.CategoryId);
    } else {
        this.Categories.splice(this.Position, 1);
    }

    // console.log("Esto es el array: ", this.Categories);
 
    cleanCategories();
    countFilter();
}

function filter() {

    for (let i = 0; i < filtroStatus.length; i++) {
        filtroStatus[i].classList.add("hide");
    }

    for (let i = 0; i < Categories.length; i++) {
        // console.log(Categories[i]);
        var valor = Categories[i];
        var elemento = document.getElementsByClassName(valor);
        // console.log("Este es el valor de elemento: ", valor);

        for (let i = 0; i < elemento.length; i++) {
            elemento[i].classList.remove("hide");
        }
    }

    localStorage.setItem('CategoryLocal', JSON.stringify(Categories));
}

function clean() {
    for (let i = 0; i < filtroStatus.length; i++) {
        filtroStatus[i].classList.remove("hide");
    }

    Categories = [];
    cleanCategories();
    cleanCheck();
    localStorage.removeItem('CategoryLocal');
    countFilter();
}

// Disabled or Enabled of buttons 
function cleanCategories() {
    const CleanButton = document.getElementById("btn-clean");
    const FilterButton = document.getElementById("btn-filter");

    console.log(Categories);
    if (Categories.length == 0) {
        CleanButton.disabled = true;
        FilterButton.disabled = true;
    } else {
        CleanButton.disabled = false;
        FilterButton.disabled = false;
    }
}

function cleanCheck(){
    const CategoryRubia = document.getElementById("CategoryRubia");
    const CategoryMorena = document.getElementById("CategoryMorena");
    const CategoryRoja = document.getElementById("CategoryRoja");

    CategoryRubia.checked = false;
    CategoryMorena.checked = false;
    CategoryRoja.checked = false;
}

function localCategory(){
    var array = localStorage.getItem('CategoryLocal');
    var check;

    if(array == null){
        // console.log("Esta vacio");
    }else{
        // console.log("Tiene Algo", JSON.parse(array));
        Categories = JSON.parse(array);
        filter();
        countFilter();
        for (let i = 0; i < Categories.length; i++) {
            if(Categories[i] == 1){
                check = document.getElementById("CategoryRubia");
            }else if(Categories[i] == 2){
                check = document.getElementById("CategoryMorena");
            }else if(Categories[i] == 3){
                check = document.getElementById("CategoryRoja");
            }
            check.checked = true;
        }
    }
}

function countFilter(){
    var CategoryCount = Categories.length;
    var filterCount = document.getElementsByClassName('count-filter');
    
    for (let i = 0; i < filterCount.length; i++) {
        if(CategoryCount == 0){
            filterCount[i].classList.add("hide");
            filterCount[i].innerHTML = CategoryCount;
        }else{
            filterCount[i].classList.remove("hide");
            filterCount[i].innerHTML = CategoryCount;
        }
    }
}
