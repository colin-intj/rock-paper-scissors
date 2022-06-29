'use strict';

/**
 * Generates results for a round of Rock Paper Scissors.
 */
class RockPaperScissors {
  /**
   * @param {string} playerSelection
   * @param {string} computerSelection
   */
  constructor(playerSelection, computerSelection) {
    this.playerSelection = playerSelection;
    this.computerSelection = computerSelection;

    this.winner = {
      /*
       * Outer keys represent the player's move
       * Inner keys represent the computer's move
       */
      rock: {rock: 'Tie', paper: 'Computer', scissors: 'Player'},
      paper: {rock: 'Player', paper: 'Tie', scissors: 'Computer'},
      scissors: {rock: 'Computer', paper: 'Player', scissors: 'Tie'},
    }[playerSelection][computerSelection];

    switch (this.winner) {
      case 'Player':
        this.winningMove = playerSelection;
        this.losingMove = computerSelection;
        break;
      case 'Computer':
        this.winningMove = computerSelection;
        this.losingMove = playerSelection;
        break;
      default:
        this.winningMove = 'N/A';
        this.losingMove = 'N/A';
    }

    this.message =
        this.winningMove === 'N/A' ?
            'Tie' : `${this.winningMove} beats ${this.losingMove}`;
  }
}

/**
 * Randomly selects the computer's move for the game Rock Paper Scissors.
 * @return {string} 'rock', 'paper', or 'scissors'
 */
const computerPlay = () => ['rock', 'paper', 'scissors'][~~(Math.random() * 2)];

/**
 * This function capitalizes the first letter in a word and decapitalizes the
 * rest.
 * @param {string} word
 * @return {string}
 */
const capitalizeFirstLetter =
    (word) => word[0].toUpperCase() + word.slice(1).toLowerCase();

const buttons = document.querySelectorAll('button');

let playerScore = 0;
let computerScore = 0;

document.querySelector(`[data-player='player'] > span`).textContent =
    playerScore;
document.querySelector(`[data-player='computer'] > span`).textContent =
    computerScore;

for (const button of buttons) {
  button.onclick = () => {
    const roundResults =
        new RockPaperScissors(button.dataset.selection, computerPlay());

    alert(`${roundResults.winner} Wins\n\n` +
        `Player chose: ${roundResults.playerSelection}\n` +
        `Computer chose: ${roundResults.computerSelection}\n\n` +
        `${capitalizeFirstLetter(roundResults.message)}`);

    if (roundResults.winner === 'Player') {
      document.querySelector(`[data-player='player'] > span`).textContent =
          ++playerScore;
    } else if (roundResults.winner === 'Computer') {
      document.querySelector(`[data-player='computer'] > span`).textContent =
          ++computerScore;
    }
  };
}

const scoreCounters = document.querySelectorAll('#scores span');

const observeScores = new MutationObserver((mutationsList, observer) => {
  const mutationTarget = mutationsList[0].target;

  if (mutationTarget.textContent === '5') {
    const winnerName =
        capitalizeFirstLetter(mutationTarget.parentNode.dataset.player);
    alert(`${winnerName} won the game!`);

    for (const scoreCounter of scoreCounters) {
      scoreCounter.textContent = '0';
    }
  }
});

for (const scoreCounter of scoreCounters) {
  observeScores.observe(scoreCounter, {childList: true});
}
