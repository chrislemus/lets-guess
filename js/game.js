class Game {
  constructor(phraseInfo, username) {
    this.tries = 5
    this.phrase = new Phrase(phraseInfo, username)
  }
}