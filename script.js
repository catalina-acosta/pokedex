let pokemonList;
let pokemonAbilities;
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
        pokemonAbilities = responsePokeCharJson;
        allPokemonWithAbilities.push(pokemonAbilities);
        
        await fetchPokemonSpecies(pokemonAbilities.id);
        
        contentRef.innerHTML += pokemonCardTemplate(pokemonAbilities, pokemonColor);

        let pokemonTypesRef = document.getElementById(`pokemonTypes${pokemonAbilities.id}`);
        pokemonTypes = pokemonAbilities.types;
        pokemonTypes.length < 2 ? pokemonTypesRef.innerHTML += `<p>${pokemonTypes[0].type.name}</p>` : pokemonTypesRef.innerHTML +=  `<p>${pokemonTypes[0].type.name}</p> <p>${pokemonTypes[1].type.name}</p>`;
    }
}

async function fetchPokemonSpecies(id) {
    let responsePokeSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    let responsePokeSpeciesJson = await responsePokeSpecies.json();

    pokemonColor = responsePokeSpeciesJson.color.name;
    return pokemonColor;
}


function pokemonCardTemplate(pokemonAbilities, pokemonColor) {

    return `
    <div id="card${pokemonAbilities.id}" class="card " onclick="toggleOverlay(${pokemonAbilities.id})">
                <div class="img-container">
                    <img src="${pokemonAbilities.sprites.other['official-artwork'].front_default}" alt="${pokemonAbilities.name}">
                </div>
                <div class="card-info ${pokemonColor}">
                    <p>${pokemonAbilities.name}</p>
                    <div id="pokemonTypes${pokemonAbilities.id}"></div>
                </div>
            </div>
    `
}


function toggleOverlay(pokemonAbilities){
    let overlayRef = document.getElementById("overlay");
    overlayRef.classList.remove("d-none");
    overlayRef.innerHTML += cardSliderTemplate(pokemonAbilities);
}

function cardSliderTemplate(pokemonAbilities) {
    return `
    <div id="cardSlider${pokemonAbilities.id}" class="card " onclick="toggleOverlay(${pokemonAbilities.id})">
                <div class="img-container">
                </div>
                <div class="card-info ${pokemonColor}">
                    <p>${pokemonAbilities.name}</p>
                    <div id="pokemonTypes${pokemonAbilities.id}"></div>
                </div>
            </div>
    `
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