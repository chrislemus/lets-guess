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

  updateGameResults() {
    if (this.tries === 0) {
      this.results = 'lose'
    } else if(this.checkForWin()) {
      this.results = 'won'
    }
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
