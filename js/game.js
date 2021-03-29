class Game {
  constructor(phraseInfo, username) {
    const {phrase, category_id, id} = phraseInfo
    this.phrase = phrase
    this.phraseCategoryId = category_id
    this.phraseId = id


    this.lettersToGuess = this.uniquePhraseLetters(phrase)
    this.lettersGuessed = new Set([])
    this.tries = 5
    this.username = username
    this.guessedLetters = []
  }

  newGuess(letter) {
    this.guessedLetters.push(letter)
    if (this.containsLetter(letter)) {
      displayCorrectGuest(letter)
    } else {
      this.wrongGuest()
    }
    this.checkIfWonOrLost()
  }

  checkIfWonOrLost() {
    if (this.tries === 0) {
      window.alert('lost')
    } else if(this.checkForWin()) {
      setTimeout(() => {
        window.alert('WON!')
      }, 1000);
    }
  }

  checkForWin() {
    const {lettersToGuess, lettersGuessed} = this
    if (lettersToGuess.size !== lettersGuessed.size) return false;
    for (const letter of lettersToGuess) {
      if (!lettersGuessed.has(letter)) return false
    };
    return true;
  }

  containsLetter(letter) {
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
    updateUIHearts()
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
