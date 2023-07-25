const baseUrl = "http://localhost:3000"
const pokemonUrl = baseUrl + "/pokemon"

// HTML ELEMENTS

const featuredPokemonWindow = document.getElementById("featured-pokemon")
const pokemonList = document.getElementById('pokemon-list')

// Page Number
let pageNumber = 1


// INITIAL FETCH
fetch(pokemonUrl)
.then(r=>r.json())
.then((data) => {
    data.slice(20*(pageNumber-1),20*pageNumber).forEach(renderPokemonInList)
    // Show 20 pokemon at a time - can increase once we add buttons
})


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

    const pokemonNameHeader = document.createElement("h5")
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