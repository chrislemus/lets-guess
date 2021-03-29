class Game {
  constructor(phraseInfo, username) {
    const {phrase, category_id, id} = phraseInfo
    this.phrase = phrase
    this.phraseCategoryId = category_id
    this.phraseId = id


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
  }

  wrongGuest() {
    this.tries -= 1
    updateUIHearts()
  }

  letterCountPerWord() {
    return this.phrase.split(' ').map(word => word.length)
  }

  containsLetter(letter) {
    return this.phrase.includes(letter)
  }

  containsLetter(letter) {
    return this.phrase.includes(letter)
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
