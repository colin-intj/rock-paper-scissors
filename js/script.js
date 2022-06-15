'use strict';

/**
 * Randomly selects the computer's move for the game Rock Paper Scissors.
 * @return {string} 'Rock', 'Paper', or 'Scissors'
 */
const computerPlay = () => ['Rock', 'Paper', 'Scissors'][~~(Math.random() * 2)];

const playRound = (playerSelection, computerSelection) => {
};
