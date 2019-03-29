$(document).ready(function () {
    var topics = ["bunny", "kitten", "puppy", "dolphin", "elephant", "raccoon", "bear", "wolf", "chicken", "turtle", "pig", "hamster", "rat", "frog", "bird"];

    function displayAnimalInfo() {

        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Q9XJdIh3ybeH5n2LLv64tqP7OxC7vpM4&limit=9&q=" + animal;
        console.log(queryURL);


        //Creating an AJAX call for the specific movie button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#animal-view").empty();
            var animalDiv = $("<div class=animal>");
            for (var i = 0; i < 8; i++) {
                var ratingURL = response.data[i].rating;
                var rating = $("<div>").text("Rating: " + ratingURL);
                // rating.attr("class","inlineShow");

                var ratingAndImage = $("<div>").attr("class","ratingAndImage");
                var imgURL = response.data[i].images.fixed_height_still.url;
                var image = $("<img>").attr("src", imgURL);

                var newThing = response.data[i].images.fixed_height.url;
                image.attr("moving", newThing);
                image.on("click", function(){
                
                    // var imgMove = response.data[i].images.fixed_height.url;
                    var imagg = $(this).attr("moving");
                   $(this).attr("src", imagg);
                    // ratingAndImage.append(imagg);
                    // console.log(imgMove);
                });
                
                image.attr("class","blockShow");

                ratingAndImage.append(rating);
                ratingAndImage.append(image);
                $("#animal-view").append(ratingAndImage);
                
                
            }
        });
    }

    //         // Creating a div to hold the movie
    //         var animalDiv = $("<div class=animal>");

    //         // Storing the rating data
    //         var rating = response.Rated;

    //         // Creating an element to have the rating displayed
    //         var pOne = $("<p>").text("Rating: " + rating);

    //         // Displaying the rating
    //         animalDiv.append(pOne);

    //         // Storing the release year
    //         var released = response.Released;

    //         // Creating an element to hold the release year
    //         var pTwo = $("<p>").text("Released: " + released);

    //         // Displaying the release year
    //         animalDiv.append(pTwo);

    //         // Storing the plot
    //         var plot = response.Plot;

    //         // Creating an element to hold the plot
    //         var pThree = $("<p>").text("Plot: " + plot);

    //         // Appending the plot
    //         animalDiv.append(pThree);

    //         // Retrieving the URL for the image
    //         var imgURL = response.Poster;

    //         // Creating an element to hold the image
    //         var image = $("<img>").attr("src", imgURL);

    //         // Appending the image
    //         animalDiv.append(image);

    //         // Putting the entire movie above the previous movies
    //         $("#animal-view").prepend(animalDiv);
    // });

    // }
    // // Function for displaying movie data
    function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of movie-btn to our button
            a.addClass("animal-btn");
            // Adding a data-attribute
            a.attr("data-name", topics[i]);
            // Providing the initial button text
            a.text(topics[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
            console.log("it works");

        }
    }

    // This function handles events where a movie button is clicked
    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        // Adding movie from the textbox to our array
        topics.push(animal);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    // Adding a click event listener to all elements with a class of "movie-btn"
    $(document).on("click", ".animal-btn", displayAnimalInfo);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

});