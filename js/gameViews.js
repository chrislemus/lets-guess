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

  displayGameOver({results}) {
    const wonMessage = document.querySelector('.game-result-message-won')
    const loseMessage = document.querySelector('.game-result-message-lose')

    this.displayPage('game-end-screen')
    const gameResultsMessage = document.querySelectorAll('.game-result-message')
    gameResultsMessage.forEach(message => {
      if (message.hasAttribute(results)) {
        message.classList.remove('is-hidden')
      } else {
        message.classList.add('is-hidden')
      }
    }) 
    this.displayPage('game-end-screen')
  }
  clearPhraseRecords() {
    const phraseTimeStatsWrapper = document.querySelector('.time-stats')
    phraseTimeStatsWrapper.innerHTML = ''
  }

  showPhraseRecords(game) {
    const {phraseId, results} = game;
    if (results === 'won') {
      const phraseTimeStatsWrapper = document.querySelector('.time-stats')
      const gameDuration = game.gameDuration()
      const recordView = (title, record) => ` <p>${title}</p> <p>${record} secs</p>`;
      
      phraseTimeStatsWrapper.innerHTML = recordView('your time', gameDuration) 
      Data.getPhraseGameRecords(phraseId)
      .then(res => res.json())
      .then(records =>  {
        const {fastest_record, slowest_record} = records
        if(fastest_record) phraseTimeStatsWrapper.innerHTML += recordView('fastest time', fastest_record) 
        if(slowest_record) phraseTimeStatsWrapper.innerHTML += recordView('slowest time', slowest_record)  
      });
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