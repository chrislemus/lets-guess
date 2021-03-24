document.addEventListener('DOMContentLoaded', () => {
  const keyboardWrapper = document.querySelector('#keyboard-wrapper');
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
  alphabet.forEach(letter => {
    const li =  document.createElement('li');
    li.innerHTML = letter.toUpperCase()
    li.classList.add("letter")
    keyboardWrapper.appendChild(li)
  })
  
});
window.addEventListener('')