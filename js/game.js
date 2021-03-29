class Game {
  constructor(phraseInfo, username) {
    const {phrase, category_id, id} = phraseInfo
    this.phrase = phrase
    this.phraseCategoryId = category_id
    this.phraseId = id
    this.results = null
    this.lettersToGuess = new Set(phrase.split('')) 
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
      // gameController.displayCorrectGuest(letter)
    } else {
      // this.wrongGuest()
      this.tries -= 1
      GuessResult = 'wrong'
    }
    this.checkIfWonOrLose()
    return GuessResult
  }

  checkIfWonOrLose() {
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

  // wrongGuest() {
    
  //   gameController.updateUIHearts()
  // }

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
