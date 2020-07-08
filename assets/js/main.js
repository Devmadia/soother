// array for storing searchTerms
var searchList = [];
var articles = [];
var noImgArt = [];

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
    // fetch news based on searchTerm entered by user through on-click input
    fetch(url + searchTerm + '&' + newsKL).then(function(response) {
        if (response.ok) {
            response.json()
            .then(function(response) {
                if (!searchList.includes(response.response.docs)) {
                    for (var i = 0; i < response.response.docs.length; i++) {
                    
                        // if image is available, push to articles array
                        if (response.response.docs[i].multimedia.length > 0) { 
                            articles.push(
                                {"headline" : response.response.docs[i].headline.main, 
                                "image" : response.response.docs[i].multimedia[0].url, 
                                "url" : response.response.docs[i].web_url}
                            );

                            console.log(response.response.docs[i].headline.main + response.response.docs[i].multimedia[0].url + response.response.docs[i].web_url);
                        }
                        
                        // if image is not available, push to noImgArt array
                        else { 
                            noImgArt.push(
                                {"headline" : response.response.docs[i].headline.main, 
                                "url" : response.response.docs[i].web_url}
                            );

                            console.log(response.response.docs[i].headline.main + response.response.docs[i].web_url);
                        }
                    }
                }
                
                /* current error persists with the fact this is generated 
                from the entire searchList, not from a specific array made with the image check */ 

                // generates information for first article element
                var titleOne = response.response.docs[0].headline.main;
                // $("#newsLead").text(response.response.docs[0].lead_paragraph);
                var linkOne = response.response.docs[0].web_url;
                var newsImageOne = response.response.docs[0].multimedia[0].url;
                var imageOne = $("<img>").attr("src", "https://nytimes.com/" + newsImageOne);
                $("#newsOne").append(imageOne);
                $("#titleOne").append(titleOne);
                $("#urlOne").append(linkOne);

                // generates information for second article element
                var titleTwo = response.response.docs[1].headline.main;
                // $("#newsLead").text(response.response.docs[1].lead_paragraph);
                var linkTwo = response.response.docs[1].web_url;
                var newsImageTwo = response.response.docs[1].multimedia[0].url;
                var imageTwo = $("<img>").attr("src", "https://nytimes.com/" + newsImageTwo);
                $("#newsTwo").append(imageTwo);
                $("#titleTwo").append(titleTwo);
                $("#urlTwo").append(linkTwo);

                // generates information for three article element
                var titleThree = response.response.docs[2].headline.main;
                // $("#newsLead").text(response.response.docs[1].lead_paragraph);
                var linkThree = response.response.docs[2].web_url;
                var newsImageThree = response.response.docs[2].multimedia[0].url;  // third article does not have an image, thus an error begins
                var imageThree = $("<img>").attr("src", "https://nytimes.com/" + newsImageThree);
                $("#newsThree").append(imageThree);
                $("#titleThree").append(titleThree);
                $("#urlThree").append(linkThree);
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