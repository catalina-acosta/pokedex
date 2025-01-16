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
            <div class="top-card-container">
                <div class="title-container">
                    <h2>${zoomedPokeCard.name}</h2>
                    <p>#${zoomedPokeCard.id}</p>
                </div>
                <div class="img-container ${zoomedPokeCard.color}">
                    <img src="${zoomedPokeCard.sprites.other['official-artwork'].front_default}" alt="${zoomedPokeCard.name}">
                </div>
            </div>
            <div class="card-info ">
                <h4>Stats:</h4>
                ${zoomedPokeCard.stats.map(stat => `
                    <div class="stat-container">
                        <p>${stat.stat.name}: </p>
                        <div class="progress-bar-container">
                            <div class="progress-bar" style="width: ${stat.base_stat}%;"></div>
                        </div>
                    </div>
                `).join('')}
                <div id="pokemonSliderTypes${zoomedPokeCard.id}" class="card-slider-types ${zoomedPokeCard.color}"></div>
            </div>
        </div>
        <div class="slider_navigation">
            <a class="prev" onclick="previousSlide(${zoomedPokeCard.id})">&#10094;</a> 
            <p>${zoomedPokeCard.id} / ${allPokemonWithAbilities.length}</p>
            <a class="next" onclick="nextSlide(${zoomedPokeCard.id})">&#10095;</a>
        </div>
    `;
}


