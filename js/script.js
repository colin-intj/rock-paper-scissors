'use strict';

/**
 * Randomly selects the computer's move for the game Rock Paper Scissors.
 * @return {string} 'rock', 'paper', or 'scissors'
 */
const computerPlay = () => ['rock', 'paper', 'scissors'][~~(Math.random() * 2)];

/**
 * This function determines whether the player won or lost and returns a message
 * containing the game results.
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
          return 'You Lose: Paper beats Rock';
        case 'scissors':
          return 'You Win: Rock beats Scissors';
      }
      break;
    case 'paper':
      switch (computerSelection) {
        case 'rock':
          return 'You Win: Paper beats Rock';
        case 'scissors':
          return 'You Lose: Scissors beats Paper';
      }
      break;
    case 'scissors':
      switch (computerSelection) {
        case 'rock':
          return 'You Lose: Rock beats Scissors';
        case 'paper':
          return 'You Win: Scissors beats Paper';
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
        prompt('Enter Your Move (\'rock\', \'paper\', or \'scissors\'): ');
    playerSelection = playerSelection.toLowerCase();

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
