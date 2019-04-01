$(document).ready(function () {
    // setting an array with desired animals
    var topics = ["bunny", "kitten", "puppy", "dolphin", "elephant", "raccoon", "bear", "wolf", "chicken", "turtle", "pig", "hamster", "rat", "frog", "bird"];

    //  creating the main fucntion to display animals
    function displayAnimalInfo() {
        //  setting an API url
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Q9XJdIh3ybeH5n2LLv64tqP7OxC7vpM4&limit=9&q=" + animal;
        console.log(queryURL);


        //Creating an AJAX call for the specific animal button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#animal-view").empty();
            var animalDiv = $("<div class=animal>");
            for (var i = 0; i < 8; i++) {
                // setting to show reting for all images
                var ratingURL = response.data[i].rating;
                var rating = $("<div>").text("Rating: " + ratingURL);
                var ratingAndImage = $("<div>").attr("class", "ratingAndImage");
                // setting the images be still
                var imgURL = response.data[i].images.fixed_height_still.url;
                var image = $("<img>").attr("src", imgURL);
                // setting the images to move
                var newThing = response.data[i].images.fixed_height.url;

                image.attr("moving", newThing);
                image.attr("stillORMoving", "still");
                // setting an image to be move on click and stop on click
                image.on("click", function () {

                    var movingImageUrl = $(this).attr("moving");

                    var makingItStill = $(this).attr("stillORMoving");

                    if (makingItStill === "still") {
                        $(this).attr("src", movingImageUrl);
                        $(this).attr("stillORMoving", "moving");
                    }
                    else {
                        $(this).attr("stillORMoving", "still");
                        var stillImageUrl = $(this).attr("still");
                        $(this).attr("src", stillImageUrl);
                    }

                });
                image.attr("still", imgURL);

                image.attr("class", "blockShow");

                ratingAndImage.append(rating);
                ratingAndImage.append(image);
                $("#animal-view").append(ratingAndImage);
            }
        });
    }

    // // Function for displaying animals data
    function renderButtons() {
        // Deleting the animals prior to adding new animals
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // setting a text input to set "desired animal" on refresh
        $("#animal-input").val("desired animal");

        // Looping through the array of animals
        for (var i = 0; i < topics.length; i++) {

            // Then dynamicaly generating buttons for each animal in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of animal-btn to our button
            a.addClass("animal-btn");
            // Adding a data-attribute
            a.attr("data-name", topics[i]);
            // Providing the initial button text
            a.text(topics[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }

    // This function handles events where an animal button is clicked
    $("#add-animal").on("click", function (event) {
        console.log($(this))

        event.preventDefault();
        // This line grabs the input from the textbox
        animal = $("#animal-input").val().trim();
        if (animal === "") {
            return false;
        }
        if (topics.includes(animal.toString())) {
            renderButtons();
        }
        else {

            // Adding animal from the textbox to our array
            topics.push(animal);

            // Calling renderButtons which handles the processing of our animal array
            renderButtons();
            $("button[data-name= " + animal + "]").trigger("click");
        }
    });

    // Adding a click event listener to all elements with a class of "animal-btn"
    $(document).on("click", ".animal-btn", displayAnimalInfo);
    // Calling the renderButtons function to display the intial buttons
    renderButtons();
});