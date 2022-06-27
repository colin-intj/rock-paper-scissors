'use strict';

/**
 * Randomly selects the computer's move for the game Rock Paper Scissors.
 * @return {string} 'rock', 'paper', or 'scissors'
 */
const computerPlay = () => ['rock', 'paper', 'scissors'][~~(Math.random() * 2)];

/**
 * Determines whether the player won or lost and returns a message containing
 * the game results.
 * @param {string} playerSelection
 * @param {string} computerSelection
 * @return {string}
 */
const playRound = (playerSelection, computerSelection) => {
  if (playerSelection === computerSelection) return 'Tie';

  switch (playerSelection) {
    case 'rock':
      switch (computerSelection) {
        case 'paper':
          return 'You lose: paper beats rock';
        case 'scissors':
          return 'You win: rock beats scissors';
      }
      break;
    case 'paper':
      switch (computerSelection) {
        case 'rock':
          return 'You win: paper beats rock';
        case 'scissors':
          return 'You lose: scissors beats paper';
      }
      break;
    case 'scissors':
      switch (computerSelection) {
        case 'rock':
          return 'You lose: rock beats scissors';
        case 'paper':
          return 'You win: scissors beats paper';
      }
      break;
  }
};

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

document.querySelector(`p[data-player='player'] > span`).textContent =
    playerScore;
document.querySelector(`p[data-player='computer'] > span`).textContent =
    computerScore;

for (const button of buttons) {
  button.onclick = () => {
    const playerSelection = button.dataset.selection;
    const computerSelection = computerPlay();

    const winner = playRound(playerSelection, computerSelection);

    alert(`You chose: ${playerSelection}\nComputer chose: ` +
        `${computerSelection}\n${winner}`);

    if (winner.startsWith('You win')) {
      document.querySelector(`p[data-player='player'] > span`).textContent =
          ++playerScore;
    } else if (winner.startsWith('You lose')) {
      document.querySelector(`p[data-player='computer'] > span`).textContent =
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
