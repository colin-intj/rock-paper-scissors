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
 * Plays multiple rounds of Rock Paper Scissors. It also returns the number of
 * times each player won and who won the most rounds.
 * @param {number} [totalRounds=5] - Number of rounds to play
 * @return {string}
 */
const game = (totalRounds = 5) => {
  let playerWins = 0;
  let computerWins = 0;

  for (let round = 0; round < totalRounds; round++) {
    let playerSelection =
        prompt('Enter your move (\'rock\', \'paper\', or \'scissors\'): ');
    playerSelection = playerSelection.toLowerCase();

    const computerSelection = computerPlay();

    const winner = playRound(playerSelection, computerSelection);

    alert(`You chose: ${playerSelection}\n` +
        `Computer chose: ${computerSelection}\n${winner}`);

    if (winner.startsWith('You win')) {
      playerWins++;
    } else if (winner.startsWith('You lose')) {
      computerWins++;
    }
  }

  return `You won ${playerWins} games\nComputer won ${computerWins} games\n` +
      `${playerWins === computerWins ? 'Tie' :
          playerWins > computerWins ? 'You win!' : 'You lose!'}`;
};

// alert(game());

const buttons = document.querySelectorAll('button');
let playerWins = 0;
let computerWins = 0;

for (const button of buttons) {
  button.onclick = (event) => {
    const playerSelection = button.dataset.selection;
    const computerSelection = computerPlay();

    const winner = playRound(playerSelection, computerSelection);

    alert(`You chose: ${playerSelection}\nComputer chose: ` +
        `${computerSelection}\n${winner}`);

    if (winner.startsWith('You win')) {
      document.querySelector(`[data-player='player']`)
          .querySelector('span').textContent = ++playerWins;
    } else if (winner.startsWith('You lose')) {
      document.querySelector(`[data-player='computer']`)
          .querySelector('span').textContent = ++computerWins;
    }
  };
}
