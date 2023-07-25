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
    detailDiv.style["background-color"] = colorLiByStatus(pokemon["caught-status"])
    newLi.append(detailDiv)

    const nameDiv = document.createElement("div")
    const pokemonNameHeader = document.createElement("h3")
    pokemonNameHeader.style.float = "left"
    pokemonNameHeader.textContent = pokemon.name.english
    nameDiv.append(pokemonNameHeader)
    detailDiv.append(nameDiv)

    const statusDiv = document.createElement("div")
    const pokemonStatus = document.createElement('p')
    pokemonStatus.textContent = pokemon["caught-status"]
    statusDiv.className = 'list-status'
    statusDiv.append(pokemonStatus)
    detailDiv.append(statusDiv)

    

    


}





//HELPER FUNCTIONS

function formatImageSrc(id) {
    id = id.toString()
    while (id.length <3) {id = `0${id}`}
    return `./images/${id}.png`
}

function colorLiByStatus(status) {
    if (status === "Uncaught") {
        return "#c98179"
    } else if (status === "In Pokedex") {
        return "#78f871"
    } else if (status === "In Livedex") {
        return "#4f5fba"
    }
}