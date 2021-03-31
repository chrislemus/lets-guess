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

  startGameSessionTimer() {
    const {gameSession, gameViews} = this
    const gameTimer = setInterval(() => {
      const gameDuration = gameSession.gameDuration()
      gameViews.updateGameTimer(gameDuration)
      if (gameSession.gameOver()) clearInterval(gameTimer);
    }, 100);
  }

  enableAllKeyboards() {
    const keyboardButtons = document.querySelectorAll('li[disabled]');
    keyboardButtons.forEach(button => button.removeAttribute('disabled'))
  }

  handleNewGuess(letter) {
    const {gameSession, gameViews} = this
    const guestResult = gameSession.newGuess(letter);
    gameViews.updateUIHearts(gameSession.tries)
    if (guestResult === 'correct') {
      gameViews.displayCorrectGuest(letter, gameSession.phrase)
    } 
    if (gameSession.gameOver()) {
      gameViews.displayGameOver(gameSession)
      if (gameSession.results === 'won') this.uploadGameRecord();
    };
  }


  uploadGameRecord() {
    const {username, gameSession} = this;
    const {phraseId} = gameSession
    const gameDuration = gameSession.gameDuration();
    Data.uploadNewGameRecord(username, gameDuration, phraseId)
    .then(() => {
      Data.getPhraseGameRecords(phraseId)
      .then(res => res.json())
      .then(({fastest_record, slowest_record}) =>  {
        this.gameViews.showPhraseRecords(gameDuration, fastest_record, slowest_record)
      }); 
    })
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
    const { gameViews,username } = this
    Data.randomPhraseByCategory(categoryId)
    .then(res => res.json())
    .then(phraseInfo => {
      this.gameSession = new GameSession(phraseInfo, username)
      gameViews.displayNewGameSessionScreen(this.gameSession)
      this.startGameSessionTimer()
    });
  }
}




const gameController = new GameController()




