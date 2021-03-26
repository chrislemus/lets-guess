class Game {
  constructor(phrase, username) {
    this.tries = 5
    this.phrase = phrase
    this.username = username
    this.guessedLetters = []
  }

  newGuess(letter) {
    this.guessedLetters.push(letter)
    if (this.phrase.containsLetter(letter)) {
      displayCorrectGuest(letter)
    } 
  }


}