// array for storing searchTerms
var searchList = [];

var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=';

// search button activation function
$("#search-button").on("click", function() {
    // cancels the event if it is cancelable
    event.preventDefault(); 
    var searchTerm = $("#searchField").val();
    if (searchTerm === ''){ // user does not enter or pick a search term
        alert("You must enter a search term!");
    }
    $("#searchField").val(""); // clears the field after user successfully enters a search term
    getNews(searchTerm)
})

// save searched terms to local storage for retrieval
function saveArticle(news) {
    // adds new items to the end of an array and returns the new length
    searchList.push(news);
    // assigning saved search terms under the key 'userInput' within the array called searchList
    localStorage.setItem('userInput', JSON.stringify(searchList));
}

// creating the searched terms' list
function addArticle(news) {
    // introduces a list item element
    var listArticle = $("<li>").addClass("list-group-item list-group-item-action").text(article);
    // adds the searched term to the ul with a class of saved-articles
    $("#saved-articles").append(listArticle);
    saveArticle(news);
}

function getNews(searchTerm) {
    fetch(url).then(function(response) {
        if (response.ok) {
            response.json()
            .then(function(response) {
                if (!searchList.includes(response.name)) {
                    addArticle(response.name);
                }
                
            })
        }
    })
}

getNews()


 /*   /**/
/*


function addArticle(news) {
    var listArticle = $("<li>").addClass("list-group-item list-group-item-action").text(article);
    $("#saved-articles").append(listArticle);
    saveArticle(news);
}

fetch(url + searchTerm + '&' + newsKL)
    .then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        })
    })

function loadArticle() {
    var storedArticle = localStorage.getItem('userInput');
    storedArticle = JSON.parse(storedArticle);

    if(!storedArticle) {
        return false;
    }

    for(var i=0; i <storedArticle.length; i++) {
        addArticle(storedArticle[i]);
    }
}

loadArticle() */