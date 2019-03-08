const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'

function randomId(min, max){
   return Math.floor(Math.random() * (+ max - + min)) + +min;
}



/*
Dada una dirección, hacer una llamada get y convertir resultado en json
tras lo cual , muestra por consola.
*/

async function paintPokemon(pokemon, wherePaint){
    pokemon = await pokemon
    wherePaint.innerHTML = `<img src="${pokemon.image}"><br>
                            <b>${pokemon.name}</b>`
}

async function getPokemon(url) {
    let pokemon = await fetch(url)
    pokemon = await pokemon.json()

    const finalPokemon = {}
    const stats = pokemon.stats
    // modificamos solo para devolver lo que queremos

    stats.forEach(element => {
        if(element.stat.name == 'attack'){
            finalPokemon.attack = element.base_stat
        }
        if(element.stat.name == 'defense'){
            finalPokemon.defense = element.base_stat
        }
    });

    finalPokemon.name = pokemon.name
    finalPokemon.image = pokemon.sprites.front_default

    
    return finalPokemon
   
}

async function attack(firstPokemonP, secondPokemonP){
    const firstPokemon = await firstPokemonP
    const secondPokemon = await secondPokemonP
    const winner = document.querySelector('#winner')

    if(firstPokemon.attack > secondPokemon){
        winner.innerHTML = `<h3>Winner: ${firstPokemon.name}</h3>`
    }
    else{
        winner.innerHTML = `<h3>Winner: ${secondPokemon.name}</h3>`
    }


}

const firstPokemonId = randomId(1, 200)
const secondPokemonId = randomId(1, 200)

const firstPokemonUrl = `${baseUrl}${firstPokemonId}`
const secondPokemonUrl = `${baseUrl}${secondPokemonId}`

// A PINTAR

const paintFirst = document.querySelector('#first')
const paintSecond = document.querySelector('#second')

const firstPokemonPromise = getPokemon(firstPokemonUrl, paintFirst)
const secondPokemonPromise = getPokemon(secondPokemonUrl, paintSecond)

paintPokemon(firstPokemonPromise, paintFirst)
paintPokemon(secondPokemonPromise, paintSecond)

const button = document.querySelector('#fight')

button.addEventListener('click', function(e){
    attack(firstPokemonPromise, secondPokemonPromise)
})