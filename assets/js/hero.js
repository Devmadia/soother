// test quote API
var html = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";

// Create function for random quote
var getQuote=function(data){
  console.log(data);
 
  $('#quote').text(data.quoteText);
  // $('#author').text(data.quoteAuthor);
};


  
// Pull quote into hero
$.getJSON(html, getQuote, 'jsonp');




