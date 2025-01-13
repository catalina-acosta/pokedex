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
    <div id="card${pokemonAbilities.id}" class="card ">
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

