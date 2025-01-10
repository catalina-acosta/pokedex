let pokemonList;
let pokemonAbilities;
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
        pokemonTypes = pokemonAbilities.types;

        await fetchPokemonSpecies(pokemonAbilities.id);

        contentRef.innerHTML += pokemonCardTemplate(pokemonAbilities, pokemonColor);
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
    <div id="card${pokemonAbilities.id}" class="card ">
                <div class="img-container">
                    <img src="${pokemonAbilities.sprites.other['official-artwork'].front_default}" alt="${pokemonAbilities.name}">
                </div>
                <div class="card-info ${pokemonColor}">
                    <p>${pokemonAbilities.name}</p>
                    <p>${pokemonTypes[0].type.name}</p> 
                </div>
            </div>
    `
}

// FRAGEN

// Warum pokemonTypes[1].type.name funkzioniert nicht? 

// um das loading circle zu machen, braucht man ein timeout() function? 

// pokemon haben 2 Typen. Welche sollte man für die hintergrund farbe nehmen? 
