const baseUrl = "http://localhost:3000"
const pokemonUrl = baseUrl + "/pokemon"

// HTML ELEMENTS

const featuredPokemonWindow = document.getElementById("featured-pokemon")
const pokemonList = document.getElementById('pokemon-list')



// INITIAL FETCH
fetch(pokemonUrl)
.then(r=>r.json())
.then((data) => {
    data.forEach()
})


function renderPokemonInList(pokemon) {
    const newLi = document.createElement('li')
    // newLi.className = ""

    const newDiv = document.createElement('div')
    // newDiv.className = ""
}