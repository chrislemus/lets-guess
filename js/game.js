class Game {
  constructor(phraseInfo, username) {
    const {phrase, category_id, id} = phraseInfo
    this.phrase = phrase
    this.phraseCategoryId = category_id
    this.phraseId = id

    this.results = null
    this.lettersToGuess = this.uniquePhraseLetters(phrase)
    this.lettersGuessed = new Set([])
    this.tries = 5
    this.username = username
    this.guessedLetters = []
  }

  newGuess(letter) {
    this.guessedLetters.push(letter)
    if (this.checkPlayerGuess(letter)) {
      gameSession.displayCorrectGuest(letter)
    } else {
      this.wrongGuest()
    }
    this.checkIfWonOrLose()
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
    const b = this.lettersGuessed
    return a.size === b.size && [...a].every(value => b.has(value));
  }

  checkPlayerGuess(letter) {
    const uniqGuess = !this.lettersGuessed.has(letter)
    const correctGuess = this.lettersToGuess.has(letter)

    if (correctGuess && uniqGuess) {
      this.lettersGuessed.add(letter)
      return true
    }
    return false
  }

  uniquePhraseLetters(phrase) {
    let uniqLetters = []
    phrase.split('').forEach(letter => {
      if(!uniqLetters.includes(letter)) {
        uniqLetters.push(letter)
      }
    })
    return new Set(uniqLetters);
  }

  wrongGuest() {
    this.tries -= 1
    gameSession.updateUIHearts()
  }

  letterCountPerWord() {
    return this.phrase.split(' ').map(word => word.length)
  }

  indexesOfLetter(letterGuessed) {
    return this.phrase.split(' ').map(word => {
      let indexes = []
      const letters = word.split('')
      letters.forEach((letter, idx) => {
        if(letter === letterGuessed) {
          indexes.push(idx)
        }
      })
      return indexes
    })
  }


}
