class GameController {

  constructor() {
    this.game = null
    this.gameViews = new GameViews()
    this.username = ''
    this.fetchCategories()
    this.startScreenEventListener()
    this.gameOverEventListener()
  }

  keyboardEventListener() {
    const keyboardButtons = document.querySelectorAll('li[letter]');
    keyboardButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const btn = e.target
        const buttonNotDisabled = !btn.getAttribute('disabled')
        if (buttonNotDisabled) {
          btn.setAttribute('disabled', true);
          const letterClicked = btn.getAttribute('letter')
          this.handleNewGuess(letterClicked)
        }
      })
    });
  }

  createKeyboards() {
    const keyboardButtons = document.querySelectorAll('li[letter]');
    const keyboardExist = keyboardButtons.length === 26
    if (keyboardExist) {
      keyboardButtons.forEach(button => button.removeAttribute('disabled'))
    } else {
      this.gameViews.createKeyboard()
      this.keyboardEventListener()
    }
  }

  handleNewGuess(letter) {
    const guestResult = this.game.newGuess(letter);
    this.gameViews.updateUIHearts(this.game.tries)
    if (guestResult === 'correct') {
      this.gameViews.displayCorrectGuest(letter, this.game.phrase)
    } 
    if (this.game.gameOver())  this.gameViews.displayGameOver();
  }

  gameOverEventListener() {
    const endScreenForm = document.querySelector('#end-screen-form')
    endScreenForm.addEventListener('submit', e => {
      e.preventDefault()
      const categoryId = endScreenForm.querySelector('select[name="category-id"]').value
      this.startGame(categoryId)
    })
  }

  startScreenEventListener() {
    const startScreenForm = document.querySelector('#start-screen-form')
    startScreenForm.addEventListener('submit', e => {
      e.preventDefault()
      const username = startScreenForm.querySelector('input[name="username"]').value
      if (username.length > 0) {
        this.username = username
        const categoryId = startScreenForm.querySelector('select[name="category-id"]').value
        this.startGame(categoryId);
      }
    })
  }


  fetchCategories() {
    Data.getCategories()
    .then(res => res.json())
    .then(categories =>  this.gameViews.addCategoriesDropdownData(categories) );
  }
  
  startGame(categoryId) {
    Data.randomPhraseByCategory(categoryId)
    .then(res => res.json())
    .then(phraseInfo => {
      this.game = new Game(phraseInfo, this.username)
      this.gameViews.displayPage('playing-screen')
      this.createKeyboards()
      this.gameViews.createPhraseBlanks(this.game.phrase)
    });
  }
}




const gameController = new GameController()




