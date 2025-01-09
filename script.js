let pokemonList;
let pokemonAbilities;
let pokemonTypes;



async function renderPokemon() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=40&offset=0');
    let responseJson = await response.json();
    pokemonList = responseJson.results;
    let contentRef = document.getElementById("content");
    
    for (let index = 0; index < pokemonList.length; index++) {
        let responsePokeChar = await fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`);
        let responsePokeCharJson = await responsePokeChar.json();
        pokemonAbilities = responsePokeCharJson;
        pokemonTypes = pokemonAbilities.types;
        contentRef.innerHTML += pokemonCardTemplate(pokemonAbilities);
    }
}

function pokemonCardTemplate(pokemonAbilities) {
    return `
    <div id="card">
                <div class="img-container">
                    <img src="${pokemonAbilities.sprites.other['official-artwork'].front_default}" alt="${pokemonAbilities.name}">
                </div>
                <div class="card-info">
                    <p>${pokemonAbilities.name}</p>
                    <p>${pokemonTypes[0].type.name}</p>
                </div>
            </div>
    `

}
