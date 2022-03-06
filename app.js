const card = document.getElementById('card')
const imgHolder = document.getElementById('img-holder')
const favBtn = document.getElementById('fav-btn')
const favourites = document.getElementById('favourites')
const thumbnails = document.getElementById('thumbnails')
const randomBtn = document.getElementById('random-btn')
const nameBar = document.querySelector('.name-bar')
const backArrow = document.getElementById('back-arrow')
const fwdArrow = document.getElementById('fwd-arrow')

let count = Math.ceil(Math.random() * 1120)
const favPokemons = []

const pokemon = {}

// GET A RANDOM ITEM ON LOAD

const getPokemon = function () {
  randomBtn.innerText = `Please wait. Searching...`

  fetch(`https://pokeapi.co/api/v2/pokemon/${count}/`)
    .then(res => res.json())
    .then(data => {
      randomBtn.innerText = `Get a random Pokémon`

      pokemon.img = data.sprites.other["official-artwork"].front_default
      pokemon.name = data.name
      pokemon.order = data.id

      imgHolder.innerHTML = `
      <img src=${pokemon.img} alt="Image of a Pokémon">
      `
      favBtn.style.setProperty('display', 'block')

      if (!favPokemons.includes(pokemon.order)) {
        favBtn.innerHTML = `<i class="fa-regular fa-star"></i>`
      } else {
        favBtn.innerHTML = `<i class="fa-solid fa-star"></i>`
      }
      nameBar.innerHTML = `<p><span class="name">${pokemon.name}</span> | No. ${pokemon.order}</p>`
    })

    .catch(err => {
      count = Math.ceil(Math.random() * 1120)
      randomBtn.innerText = `Get a random Pokémon`
      imgHolder.innerHTML = `
        <i class="fa-solid fa-bug"></i>
        `
      favBtn.style.setProperty('display', 'none')
      nameBar.innerHTML = `<p><span class="name">No Information</span></br>
      <span class="no-info">Click on the random button</span></p>`
    })
  }

getPokemon()

// SEARCH WITH RANDOM BUTTON

randomBtn.addEventListener('click', function() {
  count = Math.ceil(Math.random() * 1120)
  getPokemon()
})


// ADD / REMOVE FAVOURITE

favBtn.addEventListener('click', function() {
  if (!favPokemons.includes(pokemon.order)) {
    favPokemons.push(pokemon.order)

    thumbnails.innerHTML += `
    <div id=${pokemon.order} class="fav-thumb">
      <img src=${pokemon.img} alt="Image of a Pokémon">
      <p><span class="name">${pokemon.name}</span><br>No. ${pokemon.order}</p>
    </div>
    `
    favBtn.innerHTML = `<i class="fa-solid fa-star"></i>`
    favourites.style.setProperty('display', 'flex')
    document.querySelector(".select").style.setProperty('display', 'block')  


  } else {
    favPokemons.splice(favPokemons.indexOf(pokemon.order), 1)
    document.getElementById(`${pokemon.order}`).remove()

    favBtn.innerHTML = `<i class="fa-regular fa-star"></i>`

    if (favPokemons.length === 0) {
      favourites.style.setProperty('display', 'none')
      document.querySelector(".select").style.setProperty('display', 'none')
    }
  }

  // SELECT ITEM FROM FAVOURITES

  document.querySelectorAll(".fav-thumb").forEach(item => {
    item.addEventListener('click', function(e) {
      count = e.currentTarget.id
      getPokemon()
    })
  })

  // CLEAR ALL FAVOURITES

  document.querySelector(".fa-xmark").addEventListener('click', function() {
    favPokemons.length = 0
    thumbnails.innerHTML = ""
    favBtn.innerHTML = `<i class="fa-regular fa-star"></i>`
    favourites.style.setProperty('display', 'none')
    document.querySelector(".select").style.setProperty('display', 'none')
  })
})


// SEARCH WITH ARROWS

if (count > 1 && count < 1120) {
  fwdArrow.addEventListener('click', function() {
    count++
    getPokemon()
  })
  backArrow.addEventListener('click', function() {
    count--
    getPokemon()
  })
}





