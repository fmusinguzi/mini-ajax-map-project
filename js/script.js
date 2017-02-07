// JavaScript source code

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

    $greeting.text('So you want to live at ' + street + ', ' + city);
    var $sourceString = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + street + ", " + city + "?";
    $body.append('<img class="bgimg" src= "' + $sourceString + '">');

    var thisAddress = street + ", " + city;
    var baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    var apiKey = "3f8291dc6ff54ddfbe94b31b8d55b44b";

    var searchURL = baseURL + "?api-key=" + apiKey + "&q=" + thisAddress;


    $.getJSON(searchURL, function(data) {
            var items = [];
            var elements = document.createDocumentFragment();
            //console.log(data);
            $.each(data, function(key, val) {
                try {

                    if (key === "response") {
                        var ulElement = document.createElement("ul");
                                ulElement.setAttribute("id", "nytimes-articles");
                                ulElement.setAttribute("class", "article-list");


                        $.each(data["response"].docs, function(thisKey, thisVal) {
                            console.log(data["response"].docs[thisKey]["snippet"]);
                            var abstract = JSON.stringify(data["response"].docs[thisKey]["abstract"]);
                            var link = JSON.stringify(data["response"].docs[thisKey]["web_url"]);
                            var kicker = data["response"].docs[thisKey]["headline"]["kicker"];

                            var listElement = document.createElement("li");

                            var linkElement = document.createElement("a");
                            linkElement.setAttribute('href', link);
                            linkElement.innerText = kicker;
                                linkElement.setAttribute("class", "article");

                            listElement.append(linkElement)


                            var paragraphElement = document.createElement("p");
                            paragraphElement.innerText = abstract;
                            listElement.append(paragraphElement)

                            ulElement.append(listElement);

                            elements.append(ulElement);
                        });
                        $(document.body).append(elements);
                    }
                } catch (e) {
                    // statements to handle any exceptions
                    console.log(e); // pass exception object to error handler
                }


            });



            // $("<ul/>", {
            //     "class": "my-new-list",
            //     html: items.join("")
            // }).appendTo("body");
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


    return false;
};

$('#form-container').submit(loadData);

