'use strict';

/**
 * Randomly selects the computer's move for the game Rock Paper Scissors.
 * @return {string} 'Rock', 'Paper', or 'Scissors'
 */
const computerPlay = () => ['Rock', 'Paper', 'Scissors'][~~(Math.random() * 2)];

/**
 * This function capitalizes the first letter in a word and decapitalizes the
 * rest.
 * @param {string} word
 * @return {string}
 */
const capitalizeFirstLetter =
    (word) => word[0].toUpperCase() + word.slice(1).toLowerCase();

/**
 * This function determines whether the player won or lost and returns a message
 * containing the game results.
 * @param {string} playerSelection
 * @param {string} computerSelection
 * @return {string}
 */
const playRound = (playerSelection, computerSelection) => {
  switch (playerSelection) {
    case 'Rock':
      switch (computerSelection) {
        case 'Rock':
          return 'Tie';
        case 'Paper':
          return 'You Lose: Paper beats Rock';
        case 'Scissors':
          return 'You Win: Rock beats Scissors';
      }
      break;
    case 'Paper':
      switch (computerSelection) {
        case 'Rock':
          return 'You Win: Paper beats Rock';
        case 'Paper':
          return 'Tie';
        case 'Scissors':
          return 'You Lose: Scissors beats Paper';
      }
      break;
    case 'Scissors':
      switch (computerSelection) {
        case 'Rock':
          return 'You Lose: Rock beats Scissors';
        case 'Paper':
          return 'You Win: Scissors beats Paper';
        case 'Scissors':
          return 'Tie';
      }
      break;
  }
};

/**
 * This function plays multiple rounds of Rock Paper Scissors. It also returns
 * the number of times each player won and who won the most rounds.
 * @param {number} [totalRounds=5] - Number of rounds to play
 * @return {string}
 */
const game = (totalRounds = 5) => {
  let playerWins = 0;
  let computerWins = 0;

  for (let round = 0; round < totalRounds; round++) {
    let playerSelection =
        prompt('Enter Your Move (\'Rock\', \'Paper\', or \'Scissors\'): ');
    playerSelection = capitalizeFirstLetter(playerSelection);

    const computerSelection = computerPlay();

    const winner = playRound(playerSelection, computerSelection);

    alert(`You Chose: ${playerSelection}\n` +
        `Computer Chose: ${computerSelection}\n${winner}`);

    if (winner.includes('Win')) {
      playerWins++;
    } else if (winner.includes('Lose')) {
      computerWins++;
    }
  }

  return `You won ${playerWins} games\nComputer won ${computerWins} games\n` +
      `${playerWins === computerWins ? 'Tie' :
          playerWins > computerWins ? 'You Win!' : 'You Lose!'}`;
};

game();
