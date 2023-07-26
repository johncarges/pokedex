const baseUrl = "http://localhost:3000"
const pokemonUrl = baseUrl + "/pokemon"

// HTML ELEMENTS

const featuredPokemonWindow = document.getElementById("featured-pokemon")
const pokemonList = document.getElementById('pokemon-list')
const statusForm = document.getElementById("toggle-caught-button")
const uncaughtOption = document.getElementById("uncaught-option")    
const inLivedexOption = document.getElementById("in-livedex-option")
const inPokedexOption = document.getElementById("in-pokedex-option")


const rndInt = Math.floor(Math.random() * 150)

// Page Number
let pageNumber = 1
let currentPokemon;

const pokemonFeatured = document.getElementById('featured-pokemon')



// INITIAL FETCH
fetch(pokemonUrl)
.then(r=>r.json())
.then((data) => {
    data.slice(20*(pageNumber-1),20*pageNumber).forEach(renderPokemonInList)
    currentPokemon = data[rndInt]
    renderFeaturePokemon(currentPokemon)
    // Show 20 pokemon at a time - can increase once we add buttons
})

statusFormListener()



// Function to render feature Pokemon at top of page
function renderFeaturePokemon(pokemon) {
    
    //Insert Pokemon image
    let image = document.getElementById('pokemon-image')
    image.src = formatImageSrc(pokemon.id)
    image.alt = pokemon.name

    // Insert Pokemon name
    let name = document.getElementById('pokemon-name')
    name.textContent = pokemon.name.english

    // Insert Pokedex number
    let pokemonNumberElement = document.getElementById("pokemon-number")
    pokemonNumberElement.textContent = `Pokedex Number: ${pokemon.id}`
    
    // Insert Type info
    let typeElement = document.getElementById("type-tag")
    let type = pokemon.type[0]
    typeElement.textContent = `${pokemon.type[0]}`
    typeElement.setAttribute("style", `background-color: ${elementalColors[type][0]}; color: ${elementalColors[type][1]}`)
    
    renderStatusForm(pokemon)
    currentPokemon = pokemon
    console.log(currentPokemon.name.english)
    
}

function statusFormListener() {
    statusForm.addEventListener("change", (e) => {
        console.log(e.target.value)
        console.log(`${currentPokemon.name.english} is now ${e.target.value}`)
        let patchConfig = {
            method: "PATCH",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({"caught-status": e.target.value})
        }
        let patchUrl = `${pokemonUrl}/${currentPokemon.id}`
        fetch(patchUrl,patchConfig)
        .then(r=>r.json())
        .then(data => {
            
            console.log(data)
            const currentStatusElement = document.getElementById(`pokemonStatus${data.id}`)
            currentStatusElement.textContent = data["caught-status"]
            const currentDetailElement = document.getElementById(`detailDiv${data.id}`)
            currentDetailElement.style["background-color"] = colorLiByStatus(data["caught-status"])
        })

    })
}


function renderStatusForm(pokemon) {
    
    if (pokemon["caught-status"] === "Uncaught") {
        uncaughtOption.checked = true
    } else if (pokemon["caught-status"] === "In Livedex") {
        inLivedexOption.checked = true
    } else if (pokemon["caught-status"] === "In Pokedex") {
        inPokedexOption.checked = true
    }
     // ADD TO CHANGE POKEMON CAUGHT-STATUS
    
}

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
    detailDiv.id = `detailDiv${pokemon.id}`
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
    statusDiv.className = 'list-status'
    pokemonStatus.textContent = pokemon["caught-status"]
    pokemonStatus.id = `pokemonStatus${pokemon.id}`
    statusDiv.append(pokemonStatus)
    detailDiv.append(statusDiv)

    newLi.onclick = (e) => renderFeaturePokemon(pokemon)  
    
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

const elementalColors = {
    // For each type, color of type first, then white or black for text color depending on whether color is light or dark
    Normal: ["#f1f1f1", "#000"],
    Flying: ["#adc1c3", "#000"],
    Grass: ["#28a745", "#fff"],
    Bug: ["#8ace9a", "#000"],
    Fire: ["#f62727", "#fff"],
    Water: ["#275bf6", "#fff"],
    Electric: ["#e8f259", "#000"],
    Ice: ["#5ebfe6", "#000"],
    Psychic: ["#85388c", "#fff"],
    Ghost: ["#46325a", "#fff"],
    Poison: ["#b84982", "#fff"],
    Rock: ["#51381d", "#fff"],
    Ground: ["#a16627", "#fff"],
    Fighting: ["#4c3c2b", "#fff"],
    Dragon: ["#b0c5cc", "#000"],
}

