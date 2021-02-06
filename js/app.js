/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

/*
*Create a new instance of game class
*/
let game = null;
const startButton = document.getElementById('btn__reset');
startButton.addEventListener('click', () => {
  game = new Game();
  game.startGame();
});

/**
 * Event Listener for clicks on the on-screen keyboard buttons
 * On-screen button selected is disabled
 */

const qwertySection = document.querySelector('#qwerty');
qwertySection.addEventListener('click', (e) => {
  if (e.target.classList.contains('key')) {
    const selectedLetterButton = e.target;
    game.handleInteraction(selectedLetterButton);
  }
});

/**
 * Exceeds - add keyboard functionality so users can use physical computer keyboard
 * If the key chosen using the physical keyboard was already selected an alert opens
*/

document.addEventListener('keydown', (e) => {
  let pressedKeyButton = '';
  for (let i = 0; i < keys.length; i ++) {
    if (keys[i].textContent === e.key && keys[i].disabled != true) {
      pressedKeyButton = keys[i];
      game.handleInteraction(pressedKeyButton);
    } else if (keys[i].textContent === e.key && keys[i].disabled === true) {
      alert('Please select a letter key that you have not already chosen');
    }
  }
});
