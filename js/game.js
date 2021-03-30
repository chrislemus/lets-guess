class Game {
  constructor(phraseInfo, username) {
    const {phrase, category_id, id} = phraseInfo
    this.phrase = phrase
    this.phraseCategoryId = category_id
    this.phraseId = id
    this.results = null
    const phraseLetters = phrase.split('').filter(letter => letter !== ' ')
    this.lettersToGuess = new Set(phraseLetters) 
    this.GuessedLetters = new Set([])
    this.tries = 5
    this.username = username
    this.timerStart = Date.now()
  }

  newGuess(letter) {
    const correctGuess = this.lettersToGuess.has(letter)
    let GuessResult;
    if (correctGuess) {
      this.GuessedLetters.add(letter)
      GuessResult =  'correct'
    } else {
      this.tries -= 1
      GuessResult = 'wrong'
    }
    this.updateGameResults()
    return GuessResult
  }

  gameDuration() {
    const timerEnd = this.timerEnd || Date.now()
    const elapsedTimeInSeconds = (timerEnd - this.timerStart)/1000
    return elapsedTimeInSeconds.toFixed(2)
  }

  updateGameResults() {
    if (this.tries === 0) {
      this.results = 'lose'
      this.timerEnd = Date.now()
    };
    if(this.checkForWin())  {
      this.results = 'won'
      this.timerEnd = Date.now()
    };
  }

  gameOver() {
    return !!this.results
  }

  checkForWin() {
    const a = this.lettersToGuess
    const b = this.GuessedLetters
    return a.size === b.size && [...a].every(value => b.has(value));
  }
}
