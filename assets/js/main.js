// array for storing searchTerms
var searchList = []; // array to save article titles that persist on refresh based on user interaction

var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=';

// search field input function
$("#searchField").keypress("click", function(e) {

    if (e.which == 13) {

        // cancels the event if it is possible
        event.preventDefault(); 

        var searchTerm = $("#searchField").val();

        // when user does not enter or pick a search term
        if (searchTerm === '') { 
            alert("You must enter a search term!");
        }

        // clears the field after user successfully enters a search term
        $("#searchField").val(""); 

        // addArticle(searchTerm)
        getNews(searchTerm)
        }
})

/* gathers news for user search topic and stors searched term in an array for later usage */
function getNews(searchTerm) {

    // fetch news based on searchTerm entered by user through on-click input
    fetch(url + searchTerm + '&' + newsKL).then(function(response) {
        if (response.ok) {
            response.json()
            .then(function(response) {

                // retrieves information from searchList, if there are articles found, it begins to sort them
                if (!searchList.includes(response.response.docs)) {

                    /* clears arrays before for-loop is utilized */
                    var articles = [];
                    var noImgArt = [];

                    for (var i = 0; i < response.response.docs.length; i++) {
                        // console.log(response.response.docs[i].abstract);

                        // if image is available, push to articles array
                        if (response.response.docs[i].multimedia.length > 0) { 

                            // if images are found in article, it is pushed to articles array
                            articles.push(
                                {"headline" : response.response.docs[i].headline.main, 
                                "image" : response.response.docs[i].multimedia[0].url, 
                                "url" : response.response.docs[i].web_url}
                            );
                            
                            /* for debugging purposes */
                            //console.log(response.response.docs[i].headline.main + response.response.docs[i].multimedia[0].url + response.response.docs[i].web_url);
                        }
                        
                        // if image is not available, they're pushed to noImgArt array
                        else { 
                            noImgArt.push(
                                {"headline" : response.response.docs[i].headline.main, 
                                "url" : response.response.docs[i].web_url,
                                "abstract" : response.response.docs[i].abstract}
                            );

                            /* for debugging purposes */
                            //console.log(response.response.docs[i].headline.main + response.response.docs[i].web_url);
                        }
                    }

                    // provides information for the #newsResults & #otherNews elements
                    makeCard(articles, noImgArt)
                }
            })
        }
    })
}

/* "makeCard(articles, noImgArt):" passes (articles, noImgArt) from the getNews 
articles array to the function below */ 

function makeCard(articles, noImgArt) {

    /* clears contents of divs with article data rendered */  
    $("#newsResults").empty();
    $("#otherResults").empty();

    /* retrieves articles array information */ 

    for (var i = 0; i < articles.length; i++) {
                    
        // generates information for first article element
        var titleOne = articles[i].headline;
        
        // opens target link in new window to avoid copyright issues
        var titleLink = $("<a>").attr("target", "_blank");

        // retrieves titleLinkfrom the variable, thus remains set to [0]
        titleLink[0].href=articles[i].url;
        titleLink.html(titleOne);
        var newsImageOne = articles[i].image;
        var image = $("<img>").attr("src", "https://nytimes.com/" + newsImageOne);
        var insertImage = $("<p>").attr('id', 'image');
        var insertTitle = $("<p>").attr('id', 'title');
        var innerBox = $("<div>").addClass("primary-callout callout results");
        var outerBox = $("<div>").addClass("large-4 medium-4 small-4 cell");
        insertTitle.append(titleLink);
        insertImage.append(image);
        innerBox.append(insertImage, insertTitle);
        outerBox.append(innerBox);
        $("#newsResults").append(outerBox);
    }
    
    /* notification on page within element for when no articles are returned without images */
    if (noImgArt.length == 0) {
        $("#otherResults").append("No results without images found.");
    }

    else { 

        // populates information in an RSS feed style for articles without images
        for (var i = 0; i < noImgArt.length; i++) {
             
                var titleOne = noImgArt[i].headline;

                // opens target link in new window
                var titleLink = $("<a>").attr("target", "_blank");
                
                // retrieves titleLinkfrom the variable, thus remains set to [0]
                titleLink[0].href=noImgArt[i].url;
                titleLink.html(titleOne);
                var insertTitle = $("<p>").attr('id', 'title');
                var insertAbstract = $("<p>").attr('id', 'abstract');
                insertTitle.append(titleLink);
                insertAbstract.append(noImgArt[i].abstract);
                $("#otherResults").append(insertTitle, insertAbstract);
        }
    }
}

// // save searched terms to local storage for retrieval
// function saveLocalCopy(news) {
//     // adds new items to the end of an array and returns the new length
//     searchList.push(news);
//     // assigning saved search terms under the key 'userInput' within the array called searchList
//     localStorage.setItem('userInput', JSON.stringify(searchList));
// }

// function loadArticle() {
//     var storedArticle = localStorage.getItem('userInput');
//     storedArticle = JSON.parse(storedArticle);

//     if(!storedArticle) {
//         return false;
//     }

//     for(var i=0; i <storedArticle.length; i++) {
//         addArticle(storedArticle[i]);
//     }
// }

// loadArticle()