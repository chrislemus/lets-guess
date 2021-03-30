class GameViews {

    
  createKeyboard() {
    const keyboardLetterGroups = [['a', 'b', 'c', 'd'], ['e','f', 'g', 'h', 'i', 'j'],['k','l', 'm','n', 'o', 'p'],['q', 'r', 's', 't', 'u', 'v'], ['w', 'x', 'y', 'z']]
    const keyboardWrapper = document.querySelector('#keyboard-wrapper');
    keyboardWrapper.innerHTML = ''
    keyboardLetterGroups.forEach(letterGroup => {
      const letterKeyElements = letterGroup.map(letter => `<li letter=${letter}>${letter.toUpperCase()}</li>`).join('')
      keyboardWrapper.innerHTML += ` <ul class="key-letters-group"> ${letterKeyElements} </ul>`
    })
  }

  updateGameTimer(delta) {
    let seconds = Math.floor(delta % 60)
    if(seconds < 10) seconds = `0${seconds}`

    let minutes = Math.floor((delta /60))
    if(minutes < 10) minutes = `0${minutes}`

    const time = `🕐 ${minutes}:${seconds}`

    const timeContainer = document.querySelector('.time-container')
    timeContainer.innerText = time
  }

  createPhraseBlanks(phrase) {
    const phraseContainer = document.querySelector('#phrase-container')
    phraseContainer.innerHTML = ''
    const letterCountPerWord = phrase.split(' ').map(word => word.length)
    const phraseGroups = letterCountPerWord.map(letterCount => {
      let wordGroup = '<ul class="word-group">'
      for(let i=0; i < letterCount; i++) wordGroup += '<li></li>';
      wordGroup += '</ul>'
      return wordGroup
    })
    phraseContainer.innerHTML += phraseGroups.join('')
  }

  addCategoriesDropdownData(categories) {
    const categoriesWrappers = document.querySelectorAll('.categories-wrapper')
    const categoryOptions = categories.map(({id, name}) => `<option value=${id}>${name}</option>'`).join('')
    const categoryDropdown = `<div class="select"> <select id=categories-dropdown name="category-id"> ${categoryOptions} </select> </div>` 
    categoriesWrappers.forEach(categoryWrapper => categoryWrapper.innerHTML = categoryDropdown)
  }

  displayCorrectGuest( letterGuessed, phrase) {
    const wordGroups = document.querySelectorAll('.word-group')
    phrase.split(' ').forEach((word, wordIdx) => {
      const wordGroupBlanks = wordGroups[wordIdx].querySelectorAll('li')
      const letters = word.split('')
      letters.forEach((letter, idx) => {
        if(letter === letterGuessed) {
          wordGroupBlanks[idx].innerHTML = `${letterGuessed.toUpperCase()}`
        }
      })
    })   
  }

  displayPage(pageID) {
    const pages = document.querySelectorAll('.page')
    pages.forEach(page => page.classList.add('is-hidden'))
    const pageToShow = document.querySelector(`#${pageID}`)
    pageToShow.classList.remove('is-hidden')
  }

  displayGameOver(gameResults) {
    const wonMessage = document.querySelector('.game-result-message-won')
    const loseMessage = document.querySelector('.game-result-message-lose')
    this.displayPage('game-end-screen')
    
    if (gameResults === 'won') {
      wonMessage.classList.remove('is-hidden')
    } else if(gameResults === 'lose') {
      loseMessage.classList.remove('is-hidden')
    }
  }

  updateUIHearts(tries) {
    const heartsContainer = document.querySelector('.hearts')
    const hearts = []
    while (hearts.length < tries) {
      hearts.push('<li>♥</li>')
    }
    heartsContainer.innerHTML = hearts.join('')
  }

}