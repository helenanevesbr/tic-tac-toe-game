import winningIndexesCombinations from "./winning_combination_of_squares";

export default function calculateWinner(squares) {

  for (let i = 0; i < winningIndexesCombinations.length; i++) {

    const [a, b, c] = winningIndexesCombinations[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
    /*to prevent the condition from evaluating to true if the square at position a is empty (null).
    If the square at position a is empty, the condition will evaluate to false without checking the other squares.
    This prevents a false positive for a winner if one of the squares is empty*/

  }
  return null;
}