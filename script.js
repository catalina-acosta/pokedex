let pokemonList;
let currentPokemon;
let allPokemonWithAbilities = [];
let pokemonTypes;
let pokemonColor;

async function renderPokemon() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=40&offset=0');
    let responseJson = await response.json();
    pokemonList = responseJson.results;
    let contentRef = document.getElementById("content");
    
    for (let index = 0; index < pokemonList.length; index++) {
        let responsePokeChar = await fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`);
        let responsePokeCharJson = await responsePokeChar.json();
        currentPokemon = responsePokeCharJson;
        allPokemonWithAbilities.push(currentPokemon);
        
        await fetchPokemonSpecies(currentPokemon.id);
        
        contentRef.innerHTML += pokemonCardTemplate(currentPokemon, pokemonColor);

        let pokemonTypesRef = document.getElementById(`pokemonTypes${currentPokemon.id}`);
        pokemonTypes = currentPokemon.types;
        pokemonTypes.length < 2 ? pokemonTypesRef.innerHTML += `<p>${pokemonTypes[0].type.name}</p>` : pokemonTypesRef.innerHTML +=  `<p>${pokemonTypes[0].type.name}</p> <p>${pokemonTypes[1].type.name}</p>`;
    }
}

async function fetchPokemonSpecies(id) {
    let responsePokeSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    let responsePokeSpeciesJson = await responsePokeSpecies.json();

    pokemonColor = responsePokeSpeciesJson.color.name;
    return pokemonColor;
}


function pokemonCardTemplate(currentPokemon, pokemonColor) {

    return `
    <div id="card${currentPokemon.id}" class="card " onclick="openOverlay('${currentPokemon.id}', '${pokemonColor}')">
                <div class="img-container">
                    <img src="${currentPokemon.sprites.other['official-artwork'].front_default}" alt="${currentPokemon.name}">
                </div>
                <div class="card-info ${pokemonColor}">
                    <p>${currentPokemon.name}</p>
                    <div id="pokemonTypes${currentPokemon.id}"></div>
                </div>
            </div>
    `
}


function openOverlay(pokemonId, pokemonColor){
    let overlayRef = document.getElementById("overlay");
    overlayRef.classList.remove("d-none");

    createSlider(pokemonId, pokemonColor);
}

function createSlider(pokemonId, pokemonColor) {
    let overlayRef = document.getElementById("overlay");

    for (let index = 0; index < allPokemonWithAbilities.length; index++) {
        if (allPokemonWithAbilities[index].id == pokemonId){
            overlayRef.innerHTML += cardSliderTemplate(allPokemonWithAbilities[index], pokemonColor);
            renderPokemonSliderTypes(allPokemonWithAbilities[index]);
        }
    }
}

function cardSliderTemplate(zoomedPokeCard, pokemonColor) {
    return `
            <div id="cardSlider${zoomedPokeCard.id}" class="card " onclick="closeOverlay()">
                <div class="img-container">
                <img src="${zoomedPokeCard.sprites.other['official-artwork'].front_default}" alt="${zoomedPokeCard.name}">
                </div>
                <div class="card-info ${pokemonColor}">
                    <p>${zoomedPokeCard.name}</p>
                    <div id="pokemonSliderTypes${zoomedPokeCard.id}"></div>
                </div>
            </div>
            `
}

function renderPokemonSliderTypes(currentPokemonSlider) {
    let pokemonSliderTypesRef = document.getElementById(`pokemonSliderTypes${currentPokemonSlider.id}`);
    let pokemonSliderTypes = currentPokemonSlider.types;
    pokemonSliderTypes.length < 2 ? pokemonSliderTypesRef.innerHTML += `<p>${pokemonSliderTypes[0].type.name}</p>` : pokemonSliderTypesRef.innerHTML +=  `<p>${pokemonSliderTypes[0].type.name}</p> <p>${pokemonSliderTypes[1].type.name}</p>`;

}

function closeOverlay() {
    let overlayRef = document.getElementById("overlay");
    overlayRef.classList.add("d-none");
    overlayRef.innerHTML = "";
}
// hover effect, cursor pointer, scale etc. on the cards

// make dialog for each card that show more details of each pokemon
// transparent background, arrows to switch to the next card or previous card
// different statts and details showing 

// implement search function that filters a pokemon by name or species? 
// Suchleiste (man soll mindestens 3 Buchstaben eingeben bevor gesucht werden kann, wenn diese Buchstaben Teil des Namens eines Pokemons sind, 
// sollten diese Pokemon angezeigt werden. Es sollte eine begrenzte Anzahl an Pokemon mit den Suchkriterien angezeigt werden, z.B. 10 stück)

// improve navbar and do final styling

// button to load next 40 pokemon