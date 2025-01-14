function pokemonCardTemplate(currentPokemon) {
    return `
    <div id="card${currentPokemon.id}" class="card " onclick="openOverlay('${currentPokemon.id}', '${currentPokemon.color}')">
                <div class="img-container">
                    <img src="${currentPokemon.sprites.other['official-artwork'].front_default}" alt="${currentPokemon.name}">
                </div>
                <div class="card-info ${currentPokemon.color}">
                    <p>${currentPokemon.name}</p>
                    <div id="pokemonTypes${currentPokemon.id}"></div>
                </div>
            </div>
    `
}

function cardSliderTemplate(zoomedPokeCard) {
    return `
            <div id="cardSlider${zoomedPokeCard.id}" class="card " onclick="closeOverlay()">
                <div class="img-container">
                <img src="${zoomedPokeCard.sprites.other['official-artwork'].front_default}" alt="${zoomedPokeCard.name}">
                </div>
                <div class="card-info ${zoomedPokeCard.color}">
                    <p>${zoomedPokeCard.name}</p>
                    <div id="pokemonSliderTypes${zoomedPokeCard.id}"></div>
                </div>
                </div>
                <div class="slider_navigation">
                    <a class="prev" onclick="previousSlide(${zoomedPokeCard.id})">&#10094;</a> 
                    <p>${zoomedPokeCard.id} / ${allPokemonWithAbilities.length}</p>
                    <a class="next" onclick="nextSlide(${zoomedPokeCard.id})">&#10095;</a>
                </div>
            `
}

