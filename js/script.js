'use strict';

/**
 * Object representing a player in a game of Rock Paper Scissors
 * @typedef {Object} RockPaperScissorsPlayer
 * @property {string} name - The player's name
 * @property {string} selection - The player's selection
 */

/** Generates results for a round of Rock Paper Scissors. */
class RockPaperScissors {
  /**
   * @param {RockPaperScissorsPlayer} playerOne
   * @param {RockPaperScissorsPlayer} playerTwo
   */
  constructor(playerOne, playerTwo) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;

    this.winner = {
      /*
       * Outer keys represent the first player's move
       * Inner keys represent the second player's move
       */
      rock: {
        rock: 'Tie',
        paper: playerTwo.name,
        scissors: playerOne.name,
      },
      paper: {
        rock: playerOne.name,
        paper: 'Tie',
        scissors: playerTwo.name,
      },
      scissors: {
        rock: playerTwo.name,
        paper: playerOne.name,
        scissors: 'Tie',
      },
    }[playerOne.selection][playerTwo.selection];

    switch (this.winner) {
      case playerOne.name:
        this.message = `${playerOne.selection} beats ${playerTwo.selection}`;
        break;
      case playerTwo.name:
        this.message = `${playerTwo.selection} beats ${playerOne.selection}`;
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
 * Capitalizes the first letter in a word and decapitalizes the rest.
 * @param {string} word
 * @return {string}
 */
const capitalizeFirstLetter =
    (word) => word[0].toUpperCase() + word.slice(1).toLowerCase();

/**
 * Displays a popup message containing the game's results.
 * @param {RockPaperScissors} roundResults
 */
const displayRoundResults = (roundResults) => {
  /*
   * Creates a separate variable for `roundResults.winner`. Doing so helps
   * condense the `alert()` call.
   */
  const winner = roundResults.winner;

  alert(winner + (winner !== 'Tie' ? ' Wins!' : '!') + '\n\n' +
      `Player chose: ${roundResults.playerOne.selection}\n` +
      `Computer chose: ${roundResults.playerTwo.selection}\n\n` +
      `${capitalizeFirstLetter(roundResults.message)}`);
};

const buttons = document.querySelectorAll('button');

let playerScore = 0;
let computerScore = 0;

document.querySelector(`[data-player='player'] > span`).textContent =
    playerScore;
document.querySelector(`[data-player='computer'] > span`).textContent =
    computerScore;

for (const button of buttons) {
  button.onclick = () => {
    const roundResults = new RockPaperScissors(
        {name: 'Player', selection: button.dataset.selection},
        {name: 'Computer', selection: computerPlay()},
    );

    displayRoundResults(roundResults);

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
