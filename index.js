const baseUrl = "http://localhost:3000"
const pokemonUrl = baseUrl + "/pokemon"

// HTML ELEMENTS

const featuredPokemonWindow = document.getElementById("featured-pokemon")
const pokemonList = document.getElementById('pokemon-list')
const pokemonFeatured = document.getElementById('featured-pokemon')


// INITIAL FETCH
fetch(pokemonUrl)
.then(r=>r.json())
.then((data) => {
    data.slice(0,10).forEach(renderPokemonInList)
})

// Function to render feature Pokemon at top of page

const renderFeaturePokemon = pokemon => {
    // Insert image based on API
    // let image = document.createElement('img')
    // image.src = pokemon.image
    // image.alt = pokemon.name
    // image.className = "pokemon-image"
    // pokemonFeatured.appendChild(image)

    // Insert Pokemon name
    let h2 = document.createElement('h2')
    h2.textContent = pokemon.name.english
    h2.id = 'feature-name'
    pokemonFeatured.appendChild(h2)

    // Insert Pokedex number
    let h3 = document.createElement('h3')
    h3.textContent = `Pokedex Number: ${pokemon.id}`
    h3.id = 'pokedex-num'
    pokemonFeatured.appendChild(h3)

    // Insert Type info
    let type = document.createElement('h3')
    type.textContent = `Type: ${pokemon.type}`
    type.id = 'type'
    pokemonFeatured.appendChild(type)

    // Insert caught status
    let caught = document.createElement('h3')
    caught.textContent = `Caught Status: ${pokemon['caught-status']}`
    caught.id = 'caught-status'
    pokemonFeatured.appendChild(caught)
    
    // Insert Notes


}


function renderPokemonInList(pokemon) {
    console.log(pokemon.name.english)
    const newLi = document.createElement('li')
    newLi.className = "list-pokemon"
    pokemonList.append(newLi)

    const listImage = document.createElement('img')
    listImage.className = "list-image"
    listImage.src = formatImageSrc(pokemon.id)
    listImage.alt = ""
    newLi.append(listImage)

    const detailDiv = document.createElement("div")
    detailDiv.className = 'list-info'
    newLi.append(detailDiv)

    const pokemonNameHeader = document.createElement("h3")
    pokemonNameHeader.textContent = pokemon.name.english
    detailDiv.append(pokemonNameHeader)

    const pokemonStatus = document.createElement('p')
    pokemonStatus.textContent = pokemon["caught-status"]
    console.log(pokemonStatus)
    detailDiv.append(pokemonStatus.textContent)

    

    


}


//HELPER FUNCTIONS

function formatImageSrc(id) {
    id = id.toString()
    while (id.length <3) {id = `0${id}`}
    return `./images/${id}.png`
}