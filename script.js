let pokemonList;
let currentPokemon;
let allPokemonWithAbilities = [];
let pokemonTypes;
let pokemonColor;
let pokemonAmountToBeRendered = 0;
let limit = 80;
let offset = 0;
let renderedPokemon = [];

const pokemonIcons = [
    "assets/bulbasaur_icon-icons.com_67580.png",
    "assets/charmander_icon-icons.com_67576.png",
    "assets/eevee_icon-icons.com_67563.png",
    "assets/jigglypuff_icon-icons.com_67550.png",
    "assets/meowth_icon-icons.com_67543.png",
    "assets/pikachu_icon-icons.com_67535.png",
    "assets/snorlax_icon-icons.com_67505.png",
    "assets/squirtle_icon-icons.com_67504.png"
];

async function renderPokemon() {
    loading();
    await fetchPokemonData();
    await fetchPokemonDetails();
    await render40Pokemon();
}

async function fetchPokemonData() {
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`); 
        responseJson = await response.json();
        pokemonList = responseJson.results;
    } catch(error) {
        console.error("Failed to fetch the Pokémon list:", error);
    }
}

async function fetchPokemonDetails() {
    for (let index = offset; index < limit; index++) {
        try {
            let responsePokeChar = await fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`);
            let responsePokeCharJson = await responsePokeChar.json();
            let currentPokemon = {
                id: responsePokeCharJson.id,
                name: responsePokeCharJson.name,
                types: responsePokeCharJson.types,
                stats: responsePokeCharJson.stats,
                sprites: responsePokeCharJson.sprites,
            };

            allPokemonWithAbilities.push(currentPokemon);
        } catch {
            console.error(`Failed to fetch data for Pokémon ID ${index + 1}:`);
        }
    }
}

async function render40Pokemon() {
    pokemonAmountToBeRendered += 40;
    let loadMoreBtnRef = document.getElementById("loadMoreBtnContainer");
    let contentRef = document.getElementById("content");
    contentRef.innerHTML = "";

    for (let index = 0; index < pokemonAmountToBeRendered; index++) {
        let currentPokemon = allPokemonWithAbilities[index];
        if (!currentPokemon) {
            console.error(`Undefined Pokémon at index ${index}`);
            continue; // Skip rendering for undefined values
        }
        contentRef.innerHTML += pokemonCardTemplate(currentPokemon);
        pokemonTypes = currentPokemon.types;
        let pokemonTypesRef = document.getElementById(`pokemonTypes${currentPokemon.id}`);
        pokemonTypesRef.innerHTML += createPokemonTypesTemplate(pokemonTypes);
    }
    loadMoreBtnRef.innerHTML = `<button onclick="pokemonIncrement()">load next 40 pokemon</button>`
}

function createPokemonTypesTemplate(pokemonTypes) {
    return pokemonTypes.map(type => `<p>${type.type.name}</p>`).join('');
}

function loading() {
    let currentIndex = 0;
    let contentRef = document.getElementById("content");
    contentRef.innerHTML += loadingTemplate();
    let imgRef = document.getElementById("loading-image");

    updateImage(imgRef, currentIndex);

    const intervalId = setInterval(() => {
        currentIndex = updateImage(imgRef, currentIndex);
    }, 400);

    setTimeout(() => clearInterval(intervalId), 10000);
}

function updateImage(imgRef, currentIndex) {
    imgRef.src = pokemonIcons[currentIndex]; 
    return (currentIndex + 1) % pokemonIcons.length;
}

function pokemonIncrement() {
    limit += 40;
    offset += 40;
    renderPokemon();
}