class GameController {

  constructor() {
    this.game = null
    this.phraseContainer = document.querySelector('#phrase-container')
    this.startScreenForm = document.querySelector('#start-screen-form')
    this.keyboardWrapper = document.querySelector('#keyboard-wrapper');
    this.keyboardLetterGroups = [['a', 'b', 'c', 'd'], ['e','f', 'g', 'h', 'i', 'j'],['k','l', 'm', 'o', 'p'],['q', 'r', 's', 't', 'u', 'v'], ['w', 'x', 'y', 'z']]
    this.fetchCategories()
    this.keyboardEventListener()
    this.startScreenEventListener()
  }

  keyboardEventListener() {
    this.keyboardWrapper.addEventListener('click', (e) => {
      const letter = e.target.getAttribute('letter')
      const disabled = e.target.getAttribute('disabled')
      if (letter && !disabled) {
        this.disableLetterKey(letter)
        this.handleNewGuess(letter)
      }
    })
  }

  handleNewGuess(letter) {
    const guestResult = this.game.newGuess(letter);
    if (guestResult === 'correct') {
      this.displayCorrectGuest(letter)
    } else {
      this.updateUIHearts()
    }
    if (this.game.gameOver())  this.displayEndScreen();
  }

  startScreenEventListener() {
    this.startScreenForm.addEventListener('submit', e => {
      e.preventDefault()
      const username = this.startScreenForm.querySelector('input[name="username"]').value
      const categoryId = this.startScreenForm.querySelector('select[name="category-id"]').value
    
      if (username.length > 0) this.startGame(username, categoryId);
    })
    
  }

  fetchCategories() {
    Data.getCategories()
    .then(res => res.json())
    .then(categories =>  this.addCategoriesDropdownDataToForm(categories) );
  }

  displayEndScreen() {
    const wonMessage = document.querySelector('.game-result-message-won')
    const loseMessage = document.querySelector('.game-result-message-lose')
    this.displayPage('game-end-screen')
    
    if (this.game.results === 'won') {
      wonMessage.classList.remove('is-hidden')
    } else if(this.game.results === 'lose') {
      loseMessage.classList.remove('is-hidden')
    }
  }
  
  
  createKeyboard() {
    this.keyboardLetterGroups.forEach(letterGroup => {
      const letterKeyElements = letterGroup.map(letter => `<li letter=${letter}>${letter.toUpperCase()}</li>`).join('')
      this.keyboardWrapper.innerHTML += ` <ul class="key-letters-group"> ${letterKeyElements} </ul>`
    })
  }
  
  displayCorrectGuest( letter) {
    const wordGroups = document.querySelectorAll('.word-group')
    const indexesOfLetter = this.game.indexesOfLetter(letter)
    indexesOfLetter.forEach((indexGroup, idx) => {
      const letters = wordGroups[idx].querySelectorAll('li')
      indexGroup.forEach(letterIndex => {
        letters[letterIndex].innerHTML = `${letter.toUpperCase()}`
      })
    })
  }
  
  
  disableLetterKey(letter) {
    const letterKeys = document.querySelectorAll('.key-letters-group li[letter]')
    letterKeys.forEach(letterKey => {
      const keyWasPicked = letterKey.getAttribute('letter') === letter
      if(keyWasPicked) letterKey.setAttribute('disabled', true);
    })
  }
  
  updateUIHearts() {
    const heartsContainer = document.querySelector('.hearts')
    const hearts = []
    while (hearts.length < this.game.tries) {
      hearts.push('<li>♥</li>')
    }
    heartsContainer.innerHTML = hearts.join('')
  }
  
  addCategoriesDropdownDataToForm(categories) {
    const categoriesWrappers = document.querySelectorAll('.categories-wrapper')
    const categoryOptions = categories.map(({id, name}) => `<option value=${id}>${name}</option>'`).join('')
    const categoryDropdown = `<div class="select"> <select id=categories-dropdown name="category-id"> ${categoryOptions} </select> </div>` 
    categoriesWrappers.forEach(categoryWrapper => categoryWrapper.innerHTML = categoryDropdown)
  }
  
  
  startGame(username, categoryId) {
    Data.randomPhraseByCategory(categoryId)
    .then(res => res.json())
    .then(phraseInfo => {
      this.game = new Game(phraseInfo, username)
      this.displayPage('playing-screen')
      this.createKeyboard()
      this.createPhraseBlanks()
    });
  }
  
  createPhraseBlanks() {
    const letterCountPerWord = this.game.letterCountPerWord()
    const phraseGroups = letterCountPerWord.map(letterCount => {
      let wordGroup = '<ul class="word-group">'
      for(let i=0; i < letterCount; i++) wordGroup += '<li></li>';
      wordGroup += '</ul>'
      return wordGroup
    })
    this.phraseContainer.innerHTML += phraseGroups.join('')
  }
  
  displayPage(pageID) {
    const pages = document.querySelectorAll('.page')
    pages.forEach(page => page.classList.add('is-hidden'))
    const pageToShow = document.querySelector(`#${pageID}`)
    pageToShow.classList.remove('is-hidden')
  }
}


const gameController = new GameController()




