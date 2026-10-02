const apiUrl = 'https://pokeapi.co/api/v2/'

const pokemonsContainer = document.getElementById("pokemonsContainer")

let page = 40
let limit = 24



async function getPokemons() {
    const res = await fetch(apiUrl+`pokemon/?offset=${page}&limit=${limit}`)
    const data = await res.json()

    for(let i = 0; i < data["results"].length; i++){
        getPokemon(data["results"][i]["url"])
    }
}

async function createPokemonCard(url) {
    const res = await fetch(url)
    const data = await res.json()

    
    pokemonsContainer.innerHTML = `
    <div class="pokemonCard">
    <h2>${data["name"]}</h2>
    <p>Tipo: ${data["types"][0]["type"]["name"]}</p>
    <img src="${data["sprites"]["front_default"]}" alt="">
    </div>
    `

    const card = document.querySelector(".pokemonCard")
    if(data["types"][0]["type"]["name"] === "grass") card.style.backgroundColor = "green"
    if(data["types"][0]["type"]["name"] === "fire") card.style.backgroundColor = "red"
    if(data["types"][0]["type"]["name"] === "water") card.style.backgroundColor = "blue"
    if(data["types"][0]["type"]["name"] === "bug") card.style.backgroundColor = "lightgreen"
    if(data["types"][0]["type"]["name"] === "normal") card.style.backgroundColor = "lightgray"
    if(data["types"][0]["type"]["name"] === "poison") card.style.backgroundColor = "purple"
    if(data["types"][0]["type"]["name"] === "electric") card.style.backgroundColor = "yellow"
    if(data["types"][0]["type"]["name"] === "ground") card.style.backgroundColor = "brown"
    if(data["types"][0]["type"]["name"] === "fairy") card.style.backgroundColor = "pink"
    if(data["types"][0]["type"]["name"] === "steel") card.style.backgroundColor = "gray"

    if(data["types"][0]["type"]["name"] === "grass") document.body.style.backgroundImage = "url(./assets/grama.jpg)"
    if(data["types"][0]["type"]["name"] === "fire") document.body.style.backgroundImage = "url(./assets/fogo.jpg)"
    if(data["types"][0]["type"]["name"] === "water") document.body.style.backgroundImage = "url(./assets/agua.png)"
    if(data["types"][0]["type"]["name"] === "bug") document.body.style.backgroundImage = "url(./assets/inseto.jpg)"
    if(data["types"][0]["type"]["name"] === "normal") document.body.style.backgroundImage = "url(./assets/normal.jpg)"
    if(data["types"][0]["type"]["name"] === "poison") document.body.style.backgroundImage = "url(./assets/veneno.jpg)"
    if(data["types"][0]["type"]["name"] === "electric") document.body.style.backgroundImage = "url(./assets/eletrico.jpg)"
    if(data["types"][0]["type"]["name"] === "ground") document.body.style.backgroundImage = "url(./assets/terra.jpg)"
    if(data["types"][0]["type"]["name"] === "fairy") document.body.style.backgroundImage = "url(./assets/fada.jpg)"
    if(data["types"][0]["type"]["name"] === "psychic") document.body.style.backgroundImage = "url(./assets/psicco.jpg)"
}   



function anteriorPokemon() {
    page -= limit
    pokemonsContainer.innerHTML = ""
    getPokemons()
}
function proximoPokemon() {
    page += limit
    pokemonsContainer.innerHTML = ""
    getPokemons()
}


async function getPokemon(url) {
    const res = await fetch(url)
    const data = await res.json()

    const newPokemon = document.createElement("div")
    newPokemon.classList.add("pokemon")
    pokemonsContainer.appendChild(newPokemon)

    newPokemon.style.backgroundImage = `url(${data.sprites.front_default})`

    //Torna o card clicável
    newPokemon.addEventListener("click", () => {
        createPokemonCard(url)
    })
}


getPokemons()