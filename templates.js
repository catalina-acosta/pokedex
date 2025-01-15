function pokemonCardTemplate(currentPokemon) {
    return `
    <div id="card${currentPokemon.id}" class="card " onclick="openOverlay('${currentPokemon.id}', '${currentPokemon.color}')">
                <div class="img-container">
                    <img src="${currentPokemon.sprites.other['official-artwork'].front_default}" alt="${currentPokemon.name}">
                </div>
                <div class="card-info ${currentPokemon.color}">
                    <div class="name-id-box">
                        <p class="pokemon-name">${currentPokemon.name}</p>
                        <p class="pokemon-id">#${currentPokemon.id}</p>
                    </div>
                    <div class="pokemon-types-box" id="pokemonTypes${currentPokemon.id}"></div>
                </div>
            </div>
    `
}

function cardSliderTemplate(zoomedPokeCard) {
    return `
            <div id="cardSlider${zoomedPokeCard.id}" class="card-slider" onclick="closeOverlay()">
                <div class="img-container">
                <img src="${zoomedPokeCard.sprites.other['official-artwork'].front_default}" alt="${zoomedPokeCard.name}">
                </div>
                <div class="card-info ${zoomedPokeCard.color}">
                    <p>${zoomedPokeCard.name}</p>
                    <p>${zoomedPokeCard.stats[0].stat.name}: ${zoomedPokeCard.stats[0].base_stat}</p>
                    <p>${zoomedPokeCard.stats[1].stat.name}: ${zoomedPokeCard.stats[1].base_stat}</p>
                    <p>${zoomedPokeCard.stats[2].stat.name}: ${zoomedPokeCard.stats[2].base_stat}</p>
                    <p>${zoomedPokeCard.stats[3].stat.name}: ${zoomedPokeCard.stats[3].base_stat}</p>
                    <p>${zoomedPokeCard.stats[4].stat.name}: ${zoomedPokeCard.stats[4].base_stat}</p>
                    <p>${zoomedPokeCard.stats[5].stat.name}: ${zoomedPokeCard.stats[5].base_stat}</p>
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

