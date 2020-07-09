// test quote API
// https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?
fetch("https://api.forismatic.com/api/1.0/method=getQuote&key=457653&format=xml&lang=en", {
})
.then(function(response) {
    return response.json();
})
.then(function(response) {
    console.log(response);
    //console.log(response[0].media);
    var quoteContainerEl = document.querySelector("#quote");
    var quoteImg = document.createElement("img");
    //quoteImg.setAttribute('src', response[0].media);
    quoteContainerEl.appendChild(quoteImg);

    
});


// pull quote into hero


