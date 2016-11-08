$(document).ready(function() {
    $('#add-animal').on('click', function() {
        var searchTerm = $('#animal-input').val();
        addAnimal(searchTerm);
        renderButtons();
        return false;
    });
    $('.close').click(function() {
        $('.alert').hide();
    });
    renderButtons();

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
                console.log(response);
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

    $(document).on('click', '.animal-img', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });

});

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
