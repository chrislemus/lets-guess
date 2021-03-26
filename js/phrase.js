class Phrase {
  constructor(phraseInfo) {
    this.phrase = phraseInfo.phrase
    this.categoryId = phraseInfo.category_id
    this.id = phraseInfo.id
  }

  letterCountPerWord() {
    return this.phrase.split(' ').map(word => word.length)
  }

}