const phraseContainer = document.querySelector('#phrase-container')
const startScreenForm = document.querySelector('#start-screen-form')
const keyboardWrapper = document.querySelector('#keyboard-wrapper');
const keyboardLetterGroups = [['a', 'b', 'c', 'd', 'e'], ['f', 'g', 'h', 'i', 'j', 'k'],['l', 'm', 'o', 'p'],['q', 'r', 's', 't', 'u', 'v'], ['w', 'x', 'y', 'z']]

class GameController {

  constructor() {
    this.game = null
    this.fetchCategories()
  }

  fetchCategories() {
    data.getCategories()
    .then(res => res.json())
    .then(categories => {
      // phraseCategories = categories
      this.DisplayStartScreenForm(categories)
    });
  }

  displayEndScreen() {
    const wonMessage = document.querySelector('.game-result-message-won')
    const loseMessage = document.querySelector('.game-result-message-lose')
    this.displayPage('game-end-screen')
    
    if (game.results === 'won') {
      wonMessage.classList.remove('is-hidden')
    } else if(game.results === 'lose') {
      loseMessage.classList.remove('is-hidden')
    }
  }
  
  
  createKeyboard() {
    keyboardLetterGroups.forEach(letterGroup => {
      const letterKeyElements = letterGroup.map(letter => `<li letter=${letter}>${letter.toUpperCase()}</li>`).join('')
      keyboardWrapper.innerHTML += ` <ul class="key-letters-group"> ${letterKeyElements} </ul>`
    })
  }
  
  displayCorrectGuest( letter) {
    const wordGroups = document.querySelectorAll('.word-group')
    const indexesOfLetter = game.indexesOfLetter(letter)
    console.log(indexesOfLetter)
    indexesOfLetter.forEach((indexGroup, idx) => {
      const letters = wordGroups[idx].querySelectorAll('li')
      indexGroup.forEach(letterIndex => {
        letters[letterIndex].innerHTML += `${letter.toUpperCase()}`
      })
    })
  }
  
  
  disableLetterKey(letter) {
    const letterKeys = document.querySelectorAll('.key-letters-group li[letter]')
    letterKeys.forEach(letterKey => {
      const keyWasPicked = letterKey.getAttribute('letter') === letter
      if(keyWasPicked)  {
        letterKey.setAttribute('disabled', true)
      }
    })
  }
  
  updateUIHearts() {
    const heartsContainer = document.querySelector('.hearts')
    const hearts = []
    while (hearts.length < game.tries) {
      hearts.push('<li>♥</li>')
    }
    heartsContainer.innerHTML = hearts.join('')
  }
  
  
  
  
  
  DisplayStartScreenForm(categories) {
    const categoriesDropdown = startScreenForm.querySelector('select[name="category-id"]')
    const loadingBar = document.querySelector('.loading-bar')
    loadingBar.classList.add('is-hidden')
    startScreenForm.classList.remove('is-hidden')
  
  
    const categoryOptions = categories.map(({id, name}) => `<option value=${id}>${name}</option>'`)
    categoriesDropdown.innerHTML += categoryOptions
  }
  
  
  
  
  startGame(username, categoryId) {
    data.randomPhraseByCategory(categoryId)
    .then(res => res.json())
    .then(phraseInfo => {
      this.game = new Game(phraseInfo, username)
      this.displayPage('playing-screen')
      this.createKeyboard()
      this.createPhraseBlanks()
    });
  }
  
  createPhraseBlanks() {
    const letterCountPerWord = game.letterCountPerWord()
    const phraseGroups = letterCountPerWord.map(letterCount => {
      let wordGroup = '<ul class="word-group">'
      for(let i=0; i < letterCount; i++) wordGroup += '<li></li>';
      wordGroup += '</ul>'
      return wordGroup
    })
    phraseContainer.innerHTML += phraseGroups.join('')
  }
  
  displayPage(pageID) {
    const pages = document.querySelectorAll('.page')
    pages.forEach(page => page.classList.add('is-hidden'))
    const pageToShow = document.querySelector(`#${pageID}`)
    pageToShow.classList.remove('is-hidden')
  }
}
// ==============================
//          game boots
// ==============================


const gameSession = new GameController()



keyboardWrapper.addEventListener('click', (e) => {
  const letter = e.target.getAttribute('letter')
  const disabled = e.target.getAttribute('disabled')
  const oldGuest = gameSession.game.guessedLetters.includes(letter)

  if (letter && !disabled && !oldGuest) {
    gameSession.game.newGuess(letter);
    gameSession.disableLetterKey(letter)
    if (gameSession.game.gameOver())  gameSession.displayEndScreen();
    
  }
})

startScreenForm.addEventListener('submit', e => {
  e.preventDefault()
  const username = startScreenForm.querySelector('input[name="username"]').value
  const categoryId = startScreenForm.querySelector('select[name="category-id"]').value

  if (username.length > 0) gameSession.startGame(username, categoryId);
})


// ==============================
//          Functions
// ==============================






