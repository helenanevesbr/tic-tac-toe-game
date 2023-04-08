/*When the AI player makes a move, the aiPlay() function needs to:
- Line 21: update the squares array with the new value
- Line 27-29: call the setState() method to update the state of the Game component

This trigger a re-render of the Board and Square components with the updated game state passed down as props.
The Board component re-renders all the Square components with the updated value props.
The Square components check if their value prop has changed, and if so, update their display accordingly.*/

export default function aiPlay(history, state, setState) {
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    const emptySquaresIndexes = squares.reduce((acc, square_value, i) =>
        (square_value === null ? acc.concat(i): acc),[]
    );

    const randomIndex = Math.floor(Math.random() // a random number between 0 and 1
        * emptySquaresIndexes.length); // multiplied by 8 at most (if all squares are empty), so it will never select a number greater than 8
    const randomEmptySquareIndex = emptySquaresIndexes[randomIndex];

    squares[randomEmptySquareIndex] = state.xIsNext ? 'X' : 'O';
    /* state.xIsNext is false due to setState in handleclick() method, so the ? operator will assign 'O' to the squares[randomEmptySquareIndex]
    If we don't set xIsNext state to the opposite of its current value in aiPlay() the same way we did in handleClick(), what will happen?
    Well, the end-user will mark the square with O just the same as the AI, and it will be chaos*/

    setState({
        history: history.concat([{
          squares: squares, //Add a new item to the history array with the updated squares array.
        }]),
        stepNumber: history.length, //Update the stepNumber to the new length of the history array.
        xIsNext: !state.xIsNext, //Toggle the xIsNext flag to indicate whose turn it is next.
    });
}