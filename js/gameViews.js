class GameViews {


  updateGameTimer(delta) {
    const formattedTime = (time) => time < 10 ? `0${time}` : time
    const seconds =formattedTime( Math.floor(delta % 60) )
    const minutes = formattedTime( Math.floor((delta /60)) )
    const time = `🕐 ${minutes}:${seconds}`
    const timeContainer = document.querySelector('.time-container')
    timeContainer.innerText = time
  }

  createPhraseBlanks(phrase) {
    const phraseContainer = document.querySelector('#phrase-container')
    const phraseBlanks = phrase.split(' ').map(word => {
      const letterBlank =  Array(word.length).fill('<li></li>').join('')
      return `<ul class="word-group">${letterBlank}</ul>`
    }).join('')
    phraseContainer.innerHTML = phraseBlanks
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
      const letterBlanks = wordGroups[wordIdx].querySelectorAll('li')
      const letters = word.split('')
      letters.forEach((letter, idx) => {
        if(letter === letterGuessed) letterBlanks[idx].innerHTML = letterGuessed.toUpperCase();
      })
    })      
  }
  displayNewGameSessionScreen(gameSession) {
    const {phrase, tries} = gameSession
    this.displayPage('playing-screen')
    this.clearPhraseRecords()
    this.createPhraseBlanks(phrase)
    this.updateUIHearts(tries)
    this.enableAllKeyboards()
  }

  enableAllKeyboards() {
    const keyboardButtons = document.querySelectorAll('li[disabled]');
    keyboardButtons.forEach(button => button.removeAttribute('disabled'))
  }

  displayPage(pageID) {
    const pages = document.querySelectorAll('.page')
    pages.forEach(page => page.classList.add('is-hidden'))
    const pageToShow = document.querySelector(`#${pageID}`)
    pageToShow.classList.remove('is-hidden')
  }

  displayGameOver({results, phrase}) {
    this.displayPage('game-end-screen')
    const gameResultsMessage = document.querySelectorAll('.game-result-message')
    const phraseToGuessPlaceholder = document.querySelector('.phrase-to-guess')
    phraseToGuessPlaceholder.innerHTML = phrase.toUpperCase()
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
    const hearts =  Array(tries).fill('<li>♥</li>').join('')
    heartsContainer.innerHTML = hearts
  }

}