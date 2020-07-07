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
    addArticle(searchTerm)
    getNews(searchTerm)
})

// when previously searched term is clicked, bring up articles
function priorArticle(){
    getNews(event.target.innerText);
}

// creating the searched terms' list
function addArticle(news) {
    // introduces a list item element
    var listArticle = $("<li>").addClass("list-group-item list-group-item-action").text(news);  //need to define 
    // adds the searched term to the ul with a class of searched-articles
    $("#searched-articles").append(listArticle);
    saveArticle(news);
}

// save searched terms to local storage for retrieval
function saveArticle(news) {
    // adds new items to the end of an array and returns the new length
    searchList.push(news);
    // assigning saved search terms under the key 'userInput' within the array called searchList
    localStorage.setItem('userInput', JSON.stringify(searchList));
}

// gathering the news for searched term and storing searched term in an array to call on later
function getNews(searchTerm) {
    fetch(url + searchTerm + '&' + newsKL).then(function(response) {
        if (response.ok) {
            response.json()
            .then(function(response) {
                if (!searchList.includes(response.name)) {
                    console.log(response);
                    //addArticle(response.name);
                }
                
                // code for inserting article headers/image/abstract/date/src
            })
        }
    })
}


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

loadArticle()