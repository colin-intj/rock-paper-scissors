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
  if (playerSelection === 'Rock') {
    if (computerSelection === 'Rock') {
      return 'Tie';
    } else if (computerSelection === 'Paper') {
      return 'You Lose: Paper beats Rock';
    } else if (computerSelection === 'Scissors') {
      return 'You Win: Rock beats Scissors';
    }
  } else if (playerSelection === 'Paper') {
    if (computerSelection === 'Rock') {
      return 'You Win: Paper beats Rock';
    } else if (computerSelection === 'Paper') {
      return 'Tie';
    } else if (computerSelection === 'Scissors') {
      return 'You Lose: Scissors beats Paper';
    }
  } else if (playerSelection === 'Scissors') {
    if (computerSelection === 'Rock') {
      return 'You Lose: Rock beats Scissors';
    } else if (computerSelection === 'Paper') {
      return 'You Win: Scissors beats Paper';
    } else if (computerSelection === 'Scissors') {
      return 'Tie';
    }
  }
};
