/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

/**
 * Phrase class is an array of phrase objects
 * Constructor receives a @param (string) phrase and initializes properties
 */

class Phrase {
  constructor (phrase) {
    this.phrase = phrase.toLowerCase();
  }

  /**
* Display phrase on game board
  */

  addPhraseToDisplay () {
    // Used spread syntax to split current phrase into letters and spaces
    const currentChars = [...this.phrase];
    // Assigned the Ul child element of the phrase Div element to variable
    const phraseSectionUl = document.getElementById('phrase').firstElementChild;
    // Regex to test for any alphanumeric character
    //const regexLetter = /\w/; - changed and move to global on Game class
    

    for (let i = 0; i < currentChars.length; i++) {
      // if currentChars is a character - add an li element for a letter with hide letter class name
      // else add an li element for a space with space class name
      if (regexLetter.test(currentChars[i])) {
        const phraseLi = phraseSectionUl.appendChild(document.createElement('li'));
        phraseLi.className = `hide letter ${currentChars[i]}`;
        phraseLi.textContent = `${currentChars[i]}`;
      } else {
        const phraseLi = phraseSectionUl.appendChild(document.createElement('li'));
        phraseLi.className = 'space';
      }
    }
  }

  /**
* Method checkLetter is passed @param (string) letter and checks if letter is included in phrase
* expected output is a boolean
  */

  checkLetter (letter) {
    if (this.phrase.includes(letter)) {
      return true;
    } else {
      return false;
    }
  }

  /**
* Method showMatchedLetter is passed @param (string) letter and reveals matching letter on board
  */

  showMatchedLetter (letter) {
    const phraseSectionItems = document.querySelectorAll('#phrase li');
    phraseSectionItems.forEach(item => {
      if (item.textContent === letter) {
        item.classList.remove('hide');
        item.classList.add('show');
      }
    });
  }
}
