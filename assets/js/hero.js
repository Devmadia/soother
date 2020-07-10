// test quote API
var html = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";

// Create function for random quote
var getQuote=function(data){
  console.log(data);
  if(data.quoteAuthor === "") {
      data.quoteAuthor = "Unknown";
  }
 
  $('#quote').text(data.quoteText);
  $('#author').text(data.quoteAuthor);
};
// Call random quote
$.getJSON(html, getQuote, 'jsonp');
  
// Pull new quote into hero every 5 minutes
var newQuote = setInterval(function() {
    $.getJSON(html, getQuote, 'jsonp');
}, 30000);

// Pull new quote on-click
$('#cell').on("click", function() {
    $.getJSON(html, getQuote, 'jsonp');
});
