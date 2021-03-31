class GameController {

  constructor() {
    this.gameSession = null

    this.keyboardEventListener()
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

  displayTimer() {
    const gameTimer = setInterval(() => {
      const gameDuration = this.gameSession.gameDuration()
      this.gameViews.updateGameTimer(gameDuration)
      if (this.gameSession.gameOver()) clearInterval(gameTimer);
    }, 100);
  }

  enableAllKeyboards() {
    const keyboardButtons = document.querySelectorAll('li[disabled]');
    keyboardButtons.forEach(button => button.removeAttribute('disabled'))
  }

  handleNewGuess(letter) {
    const guestResult = this.gameSession.newGuess(letter);
    this.gameViews.updateUIHearts(this.gameSession.tries)
    if (guestResult === 'correct') {
      this.gameViews.displayCorrectGuest(letter, this.gameSession.phrase)
    } 
    if (this.gameSession.gameOver()) {
      this.gameViews.displayGameOver(this.gameSession)
      this.uploadGameRecord()
    };
  }


  uploadGameRecord() {
    if (this.gameSession.results === 'won') {
      const {username} = this;
      const elapsedTime = this.gameSession.gameDuration();
      const {phraseId} = this.gameSession
      Data.uploadNewGameRecord(username, elapsedTime, phraseId)
      .then(() => this.gameViews.showPhraseRecords(this.gameSession))
    }
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
      this.gameSession = new GameSession(phraseInfo, this.username)
      this.gameViews.displayNewGameSessionScreen(this.gameSession)
      this.displayTimer()
    });
  }
}




const gameController = new GameController()




