class GameController {

  constructor() {
    this.game = null
    this.gameViews = new GameViews()
    this.username = ''
    this.fetchCategories()
    this.keyboardEventListener()
    this.startScreenEventListener()
    this.endGameEventListener()
  }

  keyboardEventListener() {
    const keyboardWrapper = document.querySelector('#keyboard-wrapper');
    keyboardWrapper.addEventListener('click', (e) => {
      const letter = e.target.getAttribute('letter')
      const disabled = e.target.getAttribute('disabled')
      if (letter && !disabled) {
        e.target.setAttribute('disabled', true);
        this.handleNewGuess(letter)
      }
    })
  }

  endGameEventListener() {
    const endScreenForm = document.querySelector('#end-screen-form')
    endScreenForm.addEventListener('submit', e => {
      e.preventDefault()
      const categoryId = endScreenForm.querySelector('select[name="category-id"]').value
      this.startGame(categoryId)
    })
  }

  handleNewGuess(letter) {
    const guestResult = this.game.newGuess(letter);
    this.gameViews.updateUIHearts(this.game.tries)
    if (guestResult === 'correct') {
      this.gameViews.displayCorrectGuest(letter, this.game.phrase)
    } 
    if (this.game.gameOver())  this.handleGameOver();
  }

  startScreenEventListener() {
    const startScreenForm = document.querySelector('#start-screen-form')
    startScreenForm.addEventListener('submit', e => {
      e.preventDefault()
      this.username = startScreenForm.querySelector('input[name="username"]').value
      const categoryId = startScreenForm.querySelector('select[name="category-id"]').value
    
      if (this.username.length > 0) this.startGame(categoryId);
    })
    
  }

  fetchCategories() {
    Data.getCategories()
    .then(res => res.json())
    .then(categories =>  this.gameViews.addCategoriesDropdownData(categories) );
  }

  handleGameOver() {
    const wonMessage = document.querySelector('.game-result-message-won')
    const loseMessage = document.querySelector('.game-result-message-lose')
    this.gameViews.displayPage('game-end-screen')
    
    if (this.game.results === 'won') {
      wonMessage.classList.remove('is-hidden')
    } else if(this.game.results === 'lose') {
      loseMessage.classList.remove('is-hidden')
    }
  }
  

  startGame(categoryId) {
    Data.randomPhraseByCategory(categoryId)
    .then(res => res.json())
    .then(phraseInfo => {
      this.game = new Game(phraseInfo, this.username)
      this.gameViews.displayPage('playing-screen')
      this.gameViews.createKeyboard()
      this.gameViews.createPhraseBlanks(this.game)
    });
  }
}




const gameController = new GameController()




