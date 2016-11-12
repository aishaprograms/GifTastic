//global array of animals
var animals = ['Budgie', 'Ragdoll Cat', 'Golden Retriever', 'African Gray Parrot',
    'Lamb', 'Cow', 'Chipmunk', 'Elephant', 'Hedgehog', 'Sloth', 'Red fox', 'Meerkat',
    'Hamster', 'Rabbit', 'Moose', 'Chicken', 'Octopus', 'Shark', 'Eagle'
];

//adds an animal to the array from the search term if it wasn't already included
//equalizes search terms to avoid repeats
function addAnimal(animalName) {
    if (!animals.includes(animalName)) {
        animals.push(animalName);
    } else {
        $('.alert').show();
    }
}

//renders all buttons based on the array
function renderButtons() {
    //remove previous buttons as to not create repeat buttons
    $('#animal-buttons').html('');
    for (var i = 0; i < animals.length; i++) {
        addButton(animals[i]);
    }
}

//adds one button based on the array element, which is a string name of an animal
function addButton(animalName) {
    var button = $('<button>');
    button.attr('class', 'btn btn-success animal-btn');
    button.attr('data-animal', animalName);
    button.text(animalName);
    $('#animal-buttons').append(button);
}
//When all DOM elements have loaded
$(document).ready(function() {
    //This part adds and animal to the array from which the buttons were created
    $('#add-animal').on('click', function() {
        var searchTerm = $('#animal-input').val();
        addAnimal(searchTerm);
        renderButtons();
        return false;
    });
    // when this button is clicked, the alert warning, that a button with the search term has
    // already been created, shows
    $('#close-alert-button').click(function() {
        $('.alert').hide();
    });
    renderButtons();
    //when a dynamically generated button is clicked, all of the gifs matching it are shown
    //this uses ajax calls and giphy api
    //the gif images are added to the screen with their ratings
    $(document).on('click', '.animal-btn', function() {
        $('#animal-gifs').html('');
        var queryURL = 'https://api.giphy.com/v1/gifs/search?';
        var searchTerm = 'q=' + $(this).data('animal');
        var limitSearch = '&limit=10';
        var rating = '&rating=g&pg';
        var apiKey = '&api_key=dc6zaTOxFJmzC';
        queryURL = queryURL + searchTerm + limitSearch + rating + apiKey;

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
                var imagesArray = response.data;
                for (var i = 0; i < imagesArray.length; i++) {
                    var imgUrl = imagesArray[i].images.fixed_height_still.url;
                    var animatedImgUrl = imagesArray[i].images.fixed_height.url;
                    var imgDiv = $('<div>');
                    imgDiv.attr('class', 'img-div');
                    var rating = $('<p>');
                    rating.text('Rating: ' + imagesArray[i].rating);
                    var img = $('<img>');
                    img.attr('src', imgUrl);
                    img.attr('class', 'animal-img');
                    img.attr('data-still', imgUrl);
                    img.attr('data-animate', animatedImgUrl);
                    img.attr('data-state', 'still');
                    imgDiv.append(rating);
                    imgDiv.append(img);
                    $('#animal-gifs').prepend(imgDiv);
                }
            });
    });
    //when an animal gif is clicked, the url pertaining to the animated or still state of
    //the gif is added as a source url based on the current animated vs still state
    $(document).on('click', '.animal-img', function() {
        var state = $(this).attr('data-state');
        if (state === 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });

});
