function resetpokemonAmountToBeRendered(){
    pokemonAmountToBeRendered = 0;
    limit = 40;
}

function searchPokemon(){

    let inputRef = document.getElementById("input").value;
    let contentRef = document.getElementById("content");
    let loadMoreBtnRef = document.getElementById("loadMoreBtnContainer");
    contentRef.innerHTML = "";
    loadMoreBtnRef.innerHTML = "";

    if (inputRef.length > 2) {
        renderSearchedPokemon(inputRef, contentRef, loadMoreBtnRef);
    } else {
        contentRef.innerHTML += `<p>please enter more that 2 letters</p>`
    }
    loadMoreBtnRef.innerHTML += `<button class="see-all-btn" onclick="resetpokemonAmountToBeRendered(), render40Pokemon() ">see all pokemon</button>`
}

async function renderSearchedPokemon(inputRef, contentRef) {
    const searchPokeList = pokemonList.filter((pokemon) => pokemon.name.includes(inputRef));
    searchPokeList.forEach(async (pokemon) => {
        const currentPokemon = await fetchSearchedPokemon(pokemon.url)
        contentRef.innerHTML += pokemonCardTemplate(currentPokemon);
            let pokemonTypesRef = document.getElementById(`pokemonTypes${currentPokemon.id}`);
            pokemonTypes = pokemon.types;
            pokemonTypesRef.innerHTML += createPokemonTypesTemplate(currentPokemon.types);
    });
}

async function fetchSearchedPokemon(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    let currentPokemon = {
        id: responseJson.id,
        name: responseJson.name,
        types: responseJson.types,
        stats: responseJson.stats,
        sprites: responseJson.sprites,
    };
    return currentPokemon;
}

function displayFilteredPokemon(inputRef, contentRef, loadMoreBtnRef) {
    allPokemonWithAbilities.forEach(pokemon => {
            if (pokemon.name.includes(inputRef)) {
                contentRef.innerHTML += pokemonCardTemplate(pokemon);
                let pokemonTypesRef = document.getElementById(`pokemonTypes${pokemon.id}`);
                pokemonTypes = pokemon.types;
                pokemonTypesRef.innerHTML += createPokemonTypesTemplate(pokemonTypes);
            }
        });
        loadMoreBtnRef.innerHTML += `<button class="see-all-btn" onclick="resetpokemonAmountToBeRendered(), render40Pokemon() ">see all pokemon</button>`
}