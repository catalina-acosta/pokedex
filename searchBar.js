function resetpokemonAmountToBeRendered(){
    pokemonAmountToBeRendered = 0;
    limit = 40;
}

function searchPokemon(){
    limit = 200;
    renderPokemon();

    let inputRef = document.getElementById("input").value;
    let contentRef = document.getElementById("content");
    contentRef.innerHTML = "";

    let loadMoreBtnRef = document.getElementById("loadMoreBtnContainer");
    loadMoreBtnRef.innerHTML = "";

    if (inputRef.length > 2) {
        allPokemonWithAbilities.forEach(pokemon => {
            if (pokemon.name.includes(inputRef)) {
                contentRef.innerHTML += pokemonCardTemplate(pokemon);
                let pokemonTypesRef = document.getElementById(`pokemonTypes${pokemon.id}`);
                pokemonTypes = pokemon.types;
                pokemonTypes.length < 2 ? pokemonTypesRef.innerHTML += `<p>${pokemonTypes[0].type.name}</p>` : pokemonTypesRef.innerHTML +=  `<p>${pokemonTypes[0].type.name}</p> <p>${pokemonTypes[1].type.name}</p>`;
            }
        })
    } else {
        contentRef.innerHTML += `<p>please enter more that 2 letters</p>`
    }
    loadMoreBtnRef.innerHTML += `<button class="see-all-btn" onclick="resetpokemonAmountToBeRendered(), render40Pokemon() ">see all pokemon</button>`
}
