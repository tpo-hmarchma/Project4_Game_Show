/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

// Global variables
// Heart scoreboard
const scoreboard = document.querySelectorAll('.tries img');
// Page overlay
const overlay = document.getElementById('overlay');
// All qwerty letter keys
const keys = document.querySelectorAll('.key');

/**
 * Game class for managing the game
 * Constructor set missed to 0 and no active phrase to begin new game
 */

class Game {
  constructor () {
    this.missed = 0;
    this.phrases = this.createPhrases();
    this.activePhrase = 'null';
  }

  /**
* Method createPhrases creates an array of phrases
  */

  createPhrases () {
    const phraseList = [
      new Phrase('Revenge is a dish best served cold'),
      new Phrase('No news is good news'),
      new Phrase('A penny saved is a penny earned'),
      new Phrase('Less is more'),
      new Phrase('Misery loves company')
    ];
    return phraseList;
  };

  /**
* Method getRandomPhrase to obtain random phrase from array of phrases
* returns phrase object
  */

  getRandomPhrase () {
    const phrasesLength = this.phrases.length;
    const randomPhraseNumber = Math.floor(Math.random() * phrasesLength);
    return this.phrases[randomPhraseNumber];
  }

  /**
* Method startGame to begin a new game game
* Resets game board and heart images
* Removes overlay, selects random phrase, and displays empty boxes for phrase
  */

  startGame () {
    // Remove all li elements from the Phrase ul element
    let phraseSectionUl = document.getElementById('phrase').firstElementChild;
    phraseSectionUl.innerHTML = '';
    // Enable all onscreen keyboard buttons and update each to class key
    keys.forEach(key => {
      key.className = 'key';
      key.disabled = false;
    });
    // Reset heart images to liveHeart
    scoreboard.forEach(heart => {
      heart.src = 'images/liveHeart.png';
    });
    overlay.style.display = 'none';
    // Exceeds - Changed font and background color
    document.body.style.backgroundColor = '#E6B0AA';
    document.querySelector('.header').style.color = '#2E4053';
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
    this.missed = 0;
  }

  /**
* Method checkForWin checks to see if any letters are still hidden and if so returns false
  */

  checkForWin () {
    let isWin = true;
    const phraseSectionItems = document.querySelectorAll('#phrase li');
    // Review each phrase li element and set isWin variable to false if any element still has the hide class
    phraseSectionItems.forEach(item => {
      if (item.classList.contains('hide')) {
        isWin = false;
      }
    });
    return isWin;
  }

  /**
* Method removeLife icreases missed number
* Then replaces a live heart image with a lost heart image
* Exceeds - For each heart lost the background color changes to a darker shade
  */

  removeLife () {
    this.missed += 1;
    scoreboard[this.missed - 1].src = 'images/lostHeart.png';
    if (this.missed === 1) { document.body.style.backgroundColor = '#D98880'; }
    if (this.missed === 2) { document.body.style.backgroundColor = '#CD6155'; }
    if (this.missed === 3) { document.body.style.backgroundColor = '#C0392B'; }
    if (this.missed === 4) { document.body.style.backgroundColor = '#A93226'; }

    // if missed equals 5, game is ended
    if (this.missed === 5) {
      this.gameOver();
    }
  }

  /**
* Method gameOver
* When game is a loss the activePhrase is displayed in the gameOverMessage
  */

  gameOver () {
    const gameOverMessage = document.getElementById('game-over-message');
    overlay.style.display = 'block';
    if (!this.checkForWin()) {
      overlay.className = 'lose';
      overlay.style.backgroundColor = '#922B21';
      gameOverMessage.textContent = `Better luck next time, the phrase was "${this.activePhrase.phrase}". Want to play again?`;
    } else if (this.checkForWin()) {
      overlay.className = 'win';
      overlay.style.backgroundColor = '#1ABC9C';
      gameOverMessage.textContent = 'Congratulations you won! Play again?';
    }
  }

  /**
   * Method handleInteraction
   * Once letter is clicked it is disabled so it can't be selected again
   * If active phrase contains selected letter chosen class is added to letter button, and showMatchedLetter, checkForWin, and gameOver methods are called
   * If active phrase does not contain selected letter wrong class is added to letter button, and removeLife method is called
   */

  handleInteraction (selectedLetterButton) {
    const selectedLetter = selectedLetterButton.textContent;
    selectedLetterButton.disabled = true;
    if (game.activePhrase.checkLetter(selectedLetter) === false) {
      selectedLetterButton.classList.add('wrong');
      this.removeLife();
    } else if (game.activePhrase.checkLetter(selectedLetter) === true) {
      selectedLetterButton.classList.add('chosen');
      this.activePhrase.showMatchedLetter(selectedLetter);
      if (this.checkForWin()) {
        this.gameOver();
      }
    }
  }
}
