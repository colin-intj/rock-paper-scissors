'use strict';

/**
 * Generates results for a round of Rock Paper Scissors.
 */
class RockPaperScissors {
  /**
   * @param {string} playerOneSelection
   * @param {string} playerTwoSelection
   * @param {string} [playerOneName='Player 1']
   * @param {string} [playerTwoName='Player 2']
   */
  constructor(
      playerOneSelection,
      playerTwoSelection,
      playerOneName = 'Player 1',
      playerTwoName = 'Player 2',
  ) {
    this.playerOneSelection = playerOneSelection;
    this.playerTwoSelection = playerTwoSelection;
    this.playerOneName = playerOneName;
    this.playerTwoName = playerTwoName;

    this.winner = {
      /*
       * Outer keys represent the first player's move
       * Inner keys represent the second player's move
       */
      rock: {rock: 'Tie', paper: playerTwoName, scissors: playerOneName},
      paper: {rock: playerOneName, paper: 'Tie', scissors: playerTwoName},
      scissors: {rock: playerTwoName, paper: playerOneName, scissors: 'Tie'},

    }[playerOneSelection][playerTwoSelection];

    switch (this.winner) {
      case playerOneName:
        this.message = `${playerOneSelection} beats ${playerTwoSelection}`;
        break;
      case playerTwoName:
        this.message = `${playerTwoSelection} beats ${playerOneSelection}`;
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
    const roundResults = new RockPaperScissors(
        button.dataset.selection,
        computerPlay(),
        'Player',
        'Computer',
    );

    /*
     * Creates a separate variable for `roundResults.winner`. Doing so helps
     * condense the `alert()` on line 88.
     */
    const winner = roundResults.winner;

    alert(winner + (winner !== 'Tie' ? ' Wins!' : '!') + '\n\n' +
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
