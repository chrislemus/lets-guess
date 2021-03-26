const phraseContainer = document.querySelector('.phrase-container')
const startScreenForm = document.querySelector('#start-screen-form')
const keyboardWrapper = document.querySelector('#keyboard-wrapper');
const keyboardLetterGroups = [['a', 'b', 'c', 'd', 'e'], ['f', 'g', 'h', 'i', 'j', 'k'],['l', 'm', 'o', 'p'],['q', 'r', 's', 't', 'u', 'v'], ['w', 'x', 'y', 'z']]


function createKeyboard(params) {
  keyboardLetterGroups.forEach(letterGroup => {
    const letterKeyElements = letterGroup.map(letter => `<li letter=${letter}>${letter.toUpperCase()}</li>`).join('')
    keyboardWrapper.innerHTML += ` <ul class="key-letters-group"> ${letterKeyElements} </ul>`
  })
}
createKeyboard()



let game;

keyboardWrapper.addEventListener('click', (e) => {
  const letterPicked = e.target.getAttribute('letter')
  if (letterPicked) {
    
  }
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
    const phrase = new Phrase(phraseInfo)
    game = new Game(phrase, username)
    displayPage('playing-screen')
    createKeyboard()
    createPhraseBlanks(phrase)
  });
}

function createPhraseBlanks(phrase) {
  phraseContainer
  console.log(phrase)
}

function displayPage(pageID) {
  const pages = document.querySelectorAll('.page')
  pages.forEach(page => page.classList.add('is-hidden'))
  const pageToShow = document.querySelector(`#${pageID}`)
  pageToShow.classList.remove('is-hidden')
}


