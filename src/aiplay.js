/* Now that my AI is connected to the game's state, it can know what is the current state of the board and make it's move.
All I want for now is a basic move:  find empty squares and mark a random one.
Not so smart as an AI can be, but we will roll with that for now.*/

export default function aiPlay(history, state, setState) {
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    /*I was tempted to pass "squares" directly as an argument to aiPlay() instead of "history".
    If all I wanted from state's property history was the last squares array, that would be all fine and good.
    handleClick() would have already gone through the trouble of slicing history for aiPlay(), and I'd save some lines of coding (line 6 ad 7 specifically).
    However, setState() relies on the history array to update the state of the Game component correctly.
    When I call setState() in aiPlay() the same way I called it on handleClick(), you'll see what I mean*/

    const emptySquares = squares.reduce((acc, square_value, i) =>
        (square_value === null ? //The reduce function checks if the square_value is null, indicating an empty square.
            acc.concat(i) //If it is, it concatenates the i value (the index of the empty square) to the acc array
            : acc //If it isn't, the function simply returns the current value of acc.
        ),
        [] //the initial value of the accumulator
    );

    console.log(emptySquares)
}