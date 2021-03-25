const categoriesWrapper = document.querySelector('.categories-wrapper')
const playingScreen = document.querySelector('#playing-screen')
const startScreen = document.querySelector('#start-screen')
const startScreenForm = document.querySelector('#start-screen-form')
const keyboardWrapper = document.querySelector('#keyboard-wrapper');
let game;

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
alphabet.forEach(letter => {
  const li =  document.createElement('li');
  li.innerHTML = letter.toUpperCase()
  li.classList.add("letter")
  keyboardWrapper.appendChild(li)
})


data.getCategories()
.then(res => res.json())
.then(categories => DisplayStartScreenForm(categories));


function DisplayStartScreenForm(categories) {
  const categoriesDropdown = startScreenForm.querySelector('select[name="category-id"]')
  const loadingBar = document.querySelector('.loading-bar')
  loadingBar.classList.add('is-hidden')
  startScreenForm.classList.remove('is-hidden')
  const categoryOptions = categories.map(({id, name}) => `<option value=${id}>${name}</option>'`)
  categoriesDropdown.innerHTML += categoryOptions
}

startScreenForm.addEventListener('submit', e => {
  e.preventDefault()
  const username = startScreenForm.querySelector('input[name="username"]').value
  const categoryId = startScreenForm.querySelector('select[name="category-id"]').value

  if (username.length > 0) startGame(username, categoryId);
})

function startGame(username, categoryId) {
  data.randomPhraseByCategory(categoryId)
  .then(res => res.json())
  .then(phraseInfo => {
    game = new Game(phraseInfo, username)
    playingScreen.classList.remove('is-hidden')
    startScreen.classList.add('is-hidden')
  });
}



