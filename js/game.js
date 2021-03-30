class Game {
  constructor(phraseInfo, username) {
    const {phrase, category_id, id} = phraseInfo
    this.phrase = phrase
    this.phraseCategoryId = category_id
    this.phraseId = id
    this.results = null
    this.lettersToGuess = new Set(phrase.split('').filter(letter => letter !== ' ')) 
    this.GuessedLetters = new Set([])
    this.tries = 5
    this.username = username
  }

  newGuess(letter) {
    const correctGuess = this.lettersToGuess.has(letter)
    console.log(this.lettersToGuess)
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

  letterCountPerWord() {
    return this.phrase.split(' ').map(word => word.length)
  }

  indexesOfLetter(letterGuessed) {
    return this.phrase.split(' ').map(word => {
      let indexes = []
      const letters = word.split('')
      letters.forEach((letter, idx) => {
        if(letter === letterGuessed) indexes.push(idx);
      })
      return indexes
    })
  }


}
