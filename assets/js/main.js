/*

// javascript code for application

// https://stackoverflow.com/questions/61951713/problem-with-cors-policy-when-making-a-request-to-https-newsapi-org
const proxyUrl = "https://cors-anywhere.herokuapp.com/"
// const qInTitle = "";
// const from = "";
// const apiKey = "";
const url = `${proxyUrl}https://newsapi.org/v2/everything?language=en&apiKey=${newsKL}`;
const request = new Request(url);

fetch(request)
  .then(response => response.json())
  .then((news) => {
    console.log(news);
  })
  .catch(error => {
    console.log(error);
  });

*/



var searchList = [];

var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?' +
          'q=cats&' +
          newsKL;
var req = new Request(url);

function getNews(url) {
    fetch(req)
    .then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        })
    })
}

getNews()

 /*   /*fetch(url).then(function(response) {
        if (response.ok) {
            response.json()
            .then(function(response) {
                if (!searchList.includes(response.name)) {
                    addArticle(response.name);
                }
                
            })
        }
    })*/
/*


function addArticle(news) {
    var listArticle = $("<li>").addClass("list-group-item list-group-item-action").text(article);
    $("#saved-articles").append(listArticle);
    saveArticle(news);
}

function saveArticle(news) {
    searchList.push(news);
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

loadArticle() */