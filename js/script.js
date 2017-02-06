
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    var street = $('#street').val();
    var city = $('#city').val();

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    $greeting.text('So you want to live at ' + street + ', ' + city );
    var $sourceString = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + street + ", " + city + "?" ;
    $body.append('<img class="bgimg" src= "'+ $sourceString +'">');

    var thisAddress = street + ", " + city;
    var baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    var apiKey = "3f8291dc6ff54ddfbe94b31b8d55b44b";

    var searchURL = baseURL + "?api-key=" + apiKey + "&q=" + thisAddress;


$.getJSON( searchURL, function(data) {
        var items = [];
        $.each(data, function(key, val) {
            items.push("<li id='" + key + "'>" + val + "</li>");
        });
    })
.error(function() {
        alert("strange error")
    })



    // $.getJSON(searchURL, function( data ) {
    // var items = [];
    // console.log(data);
    // // $.each( data, function( key, val ) {
    // // items.push( "<li id='" + key + "'>" + val + "</li>" );
    // });

    // $( "<ul/>", {
    // "class": "my-new-list",
    // html: items.join( "" )
    //     }).appendTo( "body" );
    // });

    return false;
};

$('#form-container').submit(loadData);
