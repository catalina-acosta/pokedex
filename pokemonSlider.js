function openOverlay(pokemonId){
    let overlayRef = document.getElementById("overlay");
    overlayRef.classList.remove("d-none");

    createSlider(pokemonId);
}

function createSlider(pokemonId) {
    let overlayRef = document.getElementById("overlay");
    overlayRef.innerHTML = "";

    for (let index = 0; index < allPokemonWithAbilities.length; index++) {
        if (allPokemonWithAbilities[index].id == pokemonId){
            overlayRef.innerHTML += cardSliderTemplate(allPokemonWithAbilities[index]);
            renderPokemonSliderTypes(allPokemonWithAbilities[index]);
        }
    }
}

function previousSlide(pokemonId) {
    if (pokemonId <= 1) {
        pokemonId = allPokemonWithAbilities.length;
    } else if (pokemonId > allPokemonWithAbilities.length) {
        pokemonId === 0;
    } else {
        pokemonId = pokemonId -1;
    }
    openOverlay(pokemonId);
}

function nextSlide(pokemonId) {
    if (pokemonId >= allPokemonWithAbilities.length) {
        pokemonId = 1;
    } else {
        pokemonId = pokemonId + 1;
    }
    openOverlay(pokemonId);
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