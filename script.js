let pokemonList;
let currentPokemon;
let allPokemonWithAbilities = [];
let pokemonTypes;
let pokemonColor;
let pokemonAmountToBeRendered = 0;

async function renderPokemon() {
    loading();
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0'); // limit = 40 as variable eigeben + offset. button load more changes those variables and use same functions
    let responseJson = await response.json();
    pokemonList = responseJson.results;
    
    for (let index = 0; index < 1025; index++) {
        try {
            let responsePokeChar = await fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`);
            let responsePokeCharJson = await responsePokeChar.json();
            currentPokemon = responsePokeCharJson;
            
            await fetchPokemonSpecies(currentPokemon.id);
        
            currentPokemon.color = pokemonColor;

            allPokemonWithAbilities.push(currentPokemon);}
        catch {
            console.error(`Failed to fetch data for Pokémon ID ${index + 1}:`);
        }
    }
    await render40Pokemon();
}

async function render40Pokemon() {
    pokemonAmountToBeRendered += 40;

    let contentRef = document.getElementById("content");
    contentRef.innerHTML = "";

    let loadMoreBtnRef = document.getElementById("loadMoreBtnContainer");

    for (let index = 0; index < pokemonAmountToBeRendered; index++) {
        let currentPokemon = allPokemonWithAbilities[index];
        contentRef.innerHTML += pokemonCardTemplate(currentPokemon);
                
        let pokemonTypesRef = document.getElementById(`pokemonTypes${currentPokemon.id}`);
        pokemonTypes = currentPokemon.types;
        pokemonTypes.length < 2 ? pokemonTypesRef.innerHTML += `<p>${pokemonTypes[0].type.name}</p>` : pokemonTypesRef.innerHTML +=  `<p>${pokemonTypes[0].type.name}</p> <p>${pokemonTypes[1].type.name}</p>`;
    }

    loadMoreBtnRef.innerHTML = `<button onclick="render40Pokemon()">load next 40 pokemon</button>`
}

async function fetchPokemonSpecies(id) {
    let responsePokeSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    let responsePokeSpeciesJson = await responsePokeSpecies.json();

    pokemonColor = responsePokeSpeciesJson.color.name;
    return pokemonColor;
}

function loading() {
    const pokemonIcons = [
        "assets/bulbasaur_icon-icons.com_67580.png",
        "assets/charmander_icon-icons.com_67576.png",
        "assets/eevee_icon-icons.com_67563.png",
        "assets/jigglypuff_icon-icons.com_67550.png",
        "assets/meowth_icon-icons.com_67543.png",
        "assets/pikachu_icon-icons.com_67535.png",
        "assets/snorlax_icon-icons.com_67505.png",
        "assets/squirtle_icon-icons.com_67504.png"
    ];
    
    let currentIndex = 0; 
    let contentRef = document.getElementById("content");
    
    contentRef.innerHTML += `
        <div class="loading-content">
            <img id="loading-image" src="" alt="loading icon">
            <p>...loading...</p>
        </div>
    `;
    
    let imgRef = document.getElementById("loading-image");
    
    function updateImage() {
        imgRef.src = pokemonIcons[currentIndex];
        currentIndex = (currentIndex + 1) % pokemonIcons.length;
    }
    
    updateImage(); 
    const intervalId = setInterval(updateImage, 400);
}


function resetpokemonAmountToBeRendered(){
    pokemonAmountToBeRendered = 0;
}

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

function searchPokemon(){
    let inputRef = document.getElementById("input").value;
    console.log(inputRef);
    let contentRef = document.getElementById("content");
    contentRef.innerHTML = "";

    let loadMoreBtnRef = document.getElementById("loadMoreBtnContainer");
    loadMoreBtnRef.innerHTML = "";

    if (inputRef.length > 2) {
        allPokemonWithAbilities.forEach(pokemon => {
            if (pokemon.name.includes(inputRef)) {
                contentRef.innerHTML += pokemonCardTemplate(pokemon);
            }
        })
    } else {
        contentRef.innerHTML += `<p>please enter more that 2 letters</p>`
    }
    loadMoreBtnRef.innerHTML += `<button class="see-all-btn" onclick="resetpokemonAmountToBeRendered(), render40Pokemon() ">see all pokemon</button>`
}

// loading circle
// style slider
// chart.js doughnut chart

// improve navbar and do final styling
// add to filezilla
