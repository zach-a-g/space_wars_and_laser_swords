'use strict';

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Character Functions

let charactersArray = [];
function getAllCharacters() {
    fetch('https://swapi.dev/api/people/')
        .then(function(response) {
            // Listens for the RESPONSE from the fetch() - Promise #1
            return response.json();
        })
        .then(function(data) {
            // Listens for the DATA from response.json() - Promise #2
            buildCharacterArray(data);
        })
        .catch(function(error) {
            // Listens for a REJECTION from the fetch() promise
            console.error('ERROR:', error);
            return error;
        });
}

function buildCharacterArray(data) {
    data.results.forEach(function(character) {
        charactersArray.push(character.name);
        populateCharacterDropDown(data);
    })
    if (data.next !== null) {
        fetch(data.next)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log("data in build character array:", data);
                buildCharacterArray(data);
                // console.log(charactersArray);
            });
    }
}
getAllCharacters();

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Loaded");
    const searchForm = document.querySelector('#searchForm');
    
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('character event is: ', event);
        const searchInput = document.querySelector('#selectCharacter');
        console.log(searchInput.value);
        doSearch(searchInput.value);
    });

    filmForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('film event is: ', event);
        const filmInput = document.querySelector('#selectFilm');
        console.log(filmInput.value);
        doFilmSearch(filmInput.value);
    });

});


function buildContentCallback(data) {
    console.log('The data is: ', data.results);
    // 1. Create an unordered list
    // 2. Loop through the results array and append list items to the unordered list
    // 3. Create list item elements
    // 4. The list items will have the name values of each entry 
    // 5. Append list items to the unordered list
    // 6. Append the unordered list to the #root element
    const listOfNames = document.createElement('ul');
    data.results.forEach(function(character) {
        const characterNameItem = document.createElement('li');
        characterNameItem.innerText = character.name;
        listOfNames.appendChild(characterNameItem);
    });
    const root = document.querySelector('#root');
    root.appendChild(listOfNames);
}


function doSearch(name) {
    console.log('searching for: ', name);
    fetch(`https://swapi.dev/api/people/?search=${name}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log("Search Response: ", data);
            // Before we even call the callback
            // Make sure we actually have data!
            if (data.count > 0) {
                buildSearchResults(data);
            }
        })
        .catch(function(error) {
            console.error('ERROR: ', error);
            return error;
        });
}

const characterArray = [];

function populateCharacterDropDown(data) {
    const characterList = data.results;
    const selectList = document.querySelector('#selectCharacter');
    characterList.forEach(function(character) {
        let option = document.createElement('option');
        option.text = character.name;
        option.value = character.name;
        selectList.appendChild(option);
    })
}


function buildSearchResults(data) {
    const searchResults = data.results;
    const searchResultsDiv = document.querySelector('#searchResults');
    searchResults.forEach(function(result) {
        const characterInfo = document.createElement('p');
        characterInfo.innerText = `${result.name}'s Information
        Birth Year: ${result.birth_year}
        Gender: ${result.gender}
        Eye Color: ${result.eye_color}
        Hair Color: ${result.hair_color}
        Height: ${result.height} cm
        Homeworld: ${result.homeworld}
        Weight: ${result.mass} kg`
        searchResultsDiv.innerText = ''
        searchResultsDiv.appendChild(characterInfo);
    });
}



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Film 

fetch('https://swapi.dev/api/films/')
    .then(function(response) {
        // Listens for the RESPONSE from the fetch() - Promise #1
        return response.json();
    })
    .then(function(data) {
        // Listens for the DATA from response.json() - Promise #2
        populateFilmsDropDown(data);
        console.log("Film data is: ", data);
        // buildContentCallback(data);
    })
    .catch(function(error) {
        // Listens for a REJECTION from the fetch() promise
        console.error('ERROR: ', error);
        return error;
    });


document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Loaded");
    const filmForm = document.querySelector(`#filmForm`);
    filmForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('film event is: ', event);
        const searchInput = document.querySelector('select');
        console.log(searchInput.value);
        doFilmSearch(searchInput.value);
    });
});


function doFilmSearch(title) {
    console.log('searching for: ', title);
    fetch(`https://swapi.dev/api/films/?search=${title}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log("Film Search Response: ", data);
            // Before we even call the callback
            // Make sure we actually have data!
            if (data.count > 0) {
                buildFilmSearchResults(data);
            }
        })
        .catch(function(error) {
            console.error('ERROR: ', error);
            return error;
        });
}


function populateFilmsDropDown(data) {
    const filmList = data.results;
    const selectList = document.querySelector('#selectFilm');
    filmList.forEach(function(film) {
        let option = document.createElement('option');
        option.text = film.title;
        option.value = film.title;
        selectList.appendChild(option);
    })
}


function buildFilmSearchResults(data) {
    const searchFilmResults = data.results;
    const searchFilmResultsDiv = document.querySelector('#searchFilmResults');
    searchFilmResults.forEach(function (result) {
        const filmInfo = document.createElement('p');
        filmInfo.innerText = `${result.title}'s Information
        Director: ${result.director}
        Producer: ${result.producer}
        Release Date: ${result.release_date}
        Episode id: ${result.episode_id}
        Opening Crawl: ${result.opening_crawl}
        URL: ${result.url}`
        searchFilmResultsDiv.innerText = ''
        searchFilmResultsDiv.appendChild(filmInfo);
    });
}


