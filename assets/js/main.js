

const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const limit = 10
let offset = 0
const maxRecords= 151




function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map ((pokemon) => ` 
            <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                      ${pokemon.types.map((type) => `<li class = "type ${type}"> ${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
             </div>
             </li>
            
            `).join('') 

        pokemonList.innerHTML += newHtml
    }) 
}   

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit
    
    if(qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton) //remove botão
    } else {
        loadPokemonItens(offset, limit)
    }

   
})
    
    
    
    
    
    
    /* função de transformação, + elegante, transforma pokemon em string 
 join junta todos os elementos da lista em uma string, separados da forma que desejarmos. Por default separa com , */
    

    /*const listItems = []      //converter lista de pokemons objeto em lista de pokemons em html //

        for (let i = 0; i < pokemons.length; i++){
            const pokemon = pokemons[i];
            pokemonList.innerHTML += convertPokemonToLi(pokemon)
            listItems.push(convertPokemonToLi(pokemon))

        }
        console.log(listItems) */
   
    
