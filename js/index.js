const categoriesWrapper = document.querySelector('.categories-wrapper')
const playingScreen = document.querySelector('#playing-screen')
const startScreen = document.querySelector('#start-screen')
const dropdown = document.querySelector('#categories-dropdown')
const loadingBar = document.querySelector('.loading-bar')
const keyboardWrapper = document.querySelector('#keyboard-wrapper');
const usernameField = document.querySelector('input[name="username"]')
const usernameErrorMsg = document.querySelector('.usernameErrorMsg')
let game;

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
alphabet.forEach(letter => {
  const li =  document.createElement('li');
  li.innerHTML = letter.toUpperCase()
  li.classList.add("letter")
  keyboardWrapper.appendChild(li)
})


data.getCategories()
.then(res => res.json())
.then(categories => addCategorySelect(categories));


function addCategorySelect(categories) {
  loadingBar.classList.add('is-hidden')
  categoriesWrapper.classList.remove('is-hidden')
  const categoryOptions = categories.map(({id, name}) => `<option value=${id}>${name}</option>'`)
  dropdown.innerHTML += categoryOptions
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//add require username validation
//diable submit button after first submission
//!!!!!!!!!!!!!!!!!!!!!!!!!!!
function startGame() {
  const categoryId = document.querySelector('#categories-dropdown').value
  const username = usernameField.value
  if (username.length > 0) {
    removeUsernameErrorMsg()
    data.randomPhraseByCategory(categoryId)
    .then(res => res.json())
    .then(phraseInfo => {
      game = new Game(phraseInfo, username)
      playingScreen.classList.remove('is-hidden')
      startScreen.classList.add('is-hidden')
    });
  } else {
    addUsernameErrorMsg()
  }

}

function addUsernameErrorMsg() {
  if (!usernameField.classList.contains('is-danger')) {
    usernameField.classList.add('is-danger')
    usernameErrorMsg.classList.remove('is-hidden')
  }
}
function removeUsernameErrorMsg() {
  usernameErrorMsg.classList.add('is-hidden')
  usernameField.classList.remove('is-danger')
}



