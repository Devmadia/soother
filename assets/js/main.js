// array for storing searchTerms
var searchList = [];

// Array to hold the various article info
// var articleCounter = 0;

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
    // addArticle(searchTerm)
    getNews(searchTerm)
})

// gathering the news for searched term and storing searched term in an array to call on later
function getNews(searchTerm) {
    // let articlesRetrieved = response.docs;
    var articles = []
    var noImgArt = []

    fetch(url + searchTerm + '&' + newsKL).then(function(response) {
        if (response.ok) {
            response.json()
            .then(function(response) {
                if (!searchList.includes(response.response.docs)) {
                    for (var i = 0; i < response.response.docs.length; i++) {
                    
                        // if image is available, push to articles array
                        if (response.response.docs[i].multimedia.length > 0) { 
                            articles.push(response.response.docs[i]);
                            console.log(response.response.docs[i].headline.main + response.response.docs[i].multimedia[0].url + response.response.docs[i].web_url);
                        }
                        
                        // if image is not available, push to noImgArt array
                        else { 
                            noImgArt.push(response.response.docs[i]);
                            console.log(response.response.docs[i].headline.main + response.response.docs[i].web_url);
                        }
                    }
                }
                         
                // code for inserting article headers/image/abstract/date/src
                $("#currentNews")
                    .text(response.response.docs[0].headline.print_headline);
                $("#newsLead").text(response.response.docs[0].lead_paragraph);
                $("#newsURL").text(response.response.docs[0].web_url);
                var newsImage = response.response.docs[0].multimedia[0].url;
                var image = $("<img>").attr("src", "https://nytimes.com/" + newsImage);
                $("#currentNews").append(image);
            })
        }
    })
}

// save searched terms to local storage for retrieval
function saveArticle(news) {
    // adds new items to the end of an array and returns the new length
    searchList.push(news);
    // assigning saved search terms under the key 'userInput' within the array called searchList
    localStorage.setItem('userInput', JSON.stringify(searchList));
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