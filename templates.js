function pokemonCardTemplate(currentPokemon) {
    return `
    <div id="card${currentPokemon.id}" class="card " onclick="openOverlay('${currentPokemon.id}')">
                <div class="img-container">
                    <img src="${currentPokemon.sprites.other['official-artwork'].front_default}" alt="${currentPokemon.name}">
                </div>
                <div class="card-info ${currentPokemon.types[0].type.name}">
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
        <div id="cardSlider${zoomedPokeCard.id}" class="card-slider">
            <div class="top-card-container">
                <div class="title-container">
                    <div class="card-slider-title-id">
                        <h2>${zoomedPokeCard.name}</h2>
                        <p>#${zoomedPokeCard.id}</p>
                    </div>
                    <button id="btnCloseOverlay" class="${zoomedPokeCard.types[0].type.name}" onclick="closeOverlay()"><i class="fa-solid fa-xmark"></i></button>
                </div>
                
                <div class="img-container" id="${zoomedPokeCard.types[0].type.name}">
                    <img src="${zoomedPokeCard.sprites.other['official-artwork'].front_default}" alt="${zoomedPokeCard.name}">
                </div>
            </div>
            <div class="card-info ">
                <h4>Stats:</h4>
                ${zoomedPokeCard.stats.map(stat => `
                    <div class="stat-container">
                        <p>${stat.stat.name}: </p>
                        <div class="progress-bar-container">
                            <div class="progress-bar ${stat.stat.name}" style="width: ${stat.base_stat}%;"></div>
                        </div>
                    </div>
                `).join('')}
                <div id="pokemonSliderTypes${zoomedPokeCard.id}" class="card-slider-types ${zoomedPokeCard.types[0].type.name}"></div>
            </div>
        </div>
        <div class="slider_navigation">
            <a class="prev" onclick="previousSlide(${zoomedPokeCard.id})"><i class="fa-solid fa-angles-left"></i></a> 
            <p><strong>${zoomedPokeCard.id}</strong> / ${allPokemonWithAbilities.length}</p>
            <a class="next" onclick="nextSlide(${zoomedPokeCard.id})"><i class="fa-solid fa-angles-right"></i></a>
        </div>
    `;
}

function loadingTemplate() {
    return `
        <div class="loading-content">
            <img id="loading-image" src="" alt="loading icon">
            <p>...loading...</p>
        </div>
    `
}
