class Phrase {
  constructor(phraseInfo) {
    this.phrase = phraseInfo.phrase
    this.categoryId = phraseInfo.category_id
    this.id = phraseInfo.id
  }

  letterCountPerWord() {
    return this.phrase.split(' ').map(word => word.length)
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