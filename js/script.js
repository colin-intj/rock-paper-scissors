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
      rock: {rock: 'tie', paper: 'computer', scissors: 'player'},
      paper: {rock: 'player', paper: 'tie', scissors: 'computer'},
      scissors: {rock: 'computer', paper: 'player', scissors: 'tie'},

    }[playerSelection][computerSelection];

    switch (this.winner) {
      case 'player':
        this.message = `${playerSelection} beats ${computerSelection}`;
        break;
      case 'computer':
        this.message = `${computerSelection} beats ${playerSelection}`;
        break;
      default:
        this.message = 'tie';
    }
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

    alert(`${capitalizeFirstLetter(roundResults.winner)} Wins!\n\n` +
        `Player chose: ${roundResults.playerSelection}\n` +
        `Computer chose: ${roundResults.computerSelection}\n\n` +
        `${capitalizeFirstLetter(roundResults.message)}`);

    if (roundResults.winner === 'player') {
      document.querySelector(`[data-player='player'] > span`).textContent =
          ++playerScore;
    } else if (roundResults.winner === 'computer') {
      document.querySelector(`[data-player='computer'] > span`).textContent =
          ++computerScore;
    }
  };
}

const scoreCounters = document.querySelectorAll('#scores span');

const observeScores = new MutationObserver((mutationsList) => {
  const mutationTarget = mutationsList[0].target;

  if (mutationTarget.textContent === '5') {
    const winnerName =
        capitalizeFirstLetter(mutationTarget.parentNode.dataset.player);
    alert(`${winnerName} Won the Game!`);

    for (const scoreCounter of scoreCounters) {
      scoreCounter.textContent = '0';
    }
  }
});

for (const scoreCounter of scoreCounters) {
  observeScores.observe(scoreCounter, {childList: true});
}
