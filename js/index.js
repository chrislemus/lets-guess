document.addEventListener('DOMContentLoaded', () => {
  const keyboardWrapper = document.querySelector('#keyboard-wrapper');
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
  alphabet.forEach(letter => {
    const li =  document.createElement('li');
    li.innerHTML = letter.toUpperCase()
    li.classList.add("letter")
    keyboardWrapper.appendChild(li)
  })

  fetch('http://localhost:3000/categories')
  .then(res => res.json())
  .then(categories => addCategorySelect(categories));
});


function addCategorySelect(categories) {
  const categoriesWrapper = document.querySelector('.categories-wrapper')
  const dropdown = document.querySelector('#categories-dropdown')
  const loadingBar = document.querySelector('.loading-bar')

  loadingBar.classList.add('is-invisible')
  categoriesWrapper.classList.remove('is-invisible')
  
  const categoryOptions = categories.map(({id, name}) => `<option value=${id}>${name}</option>'`)
  dropdown.innerHTML += categoryOptions

}

function getPhraseByCategory() {
  const categoryId = document.querySelector('#categories-dropdown').value
  console.log(dropdown.value)
}


// window.addEventListener('')