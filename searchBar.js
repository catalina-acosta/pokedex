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
        displayFilteredPokemon(inputRef, contentRef, loadMoreBtnRef);
    } else {
        contentRef.innerHTML += `<p>please enter more that 2 letters</p>`
    }
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