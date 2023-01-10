

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url) //busca a lista
        .then((response) => response.json()) // Promise da conversão do body (readable stream) para json //            
        .then( (jsonBody) => jsonBody.results) // filtra o resultado, a lista de pokemons
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // mapeia a lista de requisições dos detalhes dos pokemons, faz novo fetch e já converte para json
        .then((detailRequests)=> Promise.all(detailRequests)) //espera todas as requisições terminarem
        .then((pokemonsDetails) => pokemonsDetails)//exibe a lista de detalhes dos pokemons
    
        }