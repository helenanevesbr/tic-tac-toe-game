import tryWinningMove from "./try_winning_move.mjs";
import pickEmptySquareRandomly from "./pick_empty_square_randomly.mjs";

function switchPlayer(marker) {
    return marker === "X" ? "O" : "X"
}

export default function aiPlay(squares, marker) {

    const emptySquaresIndexes = squares.reduce((acc, square_value, i) => (square_value === null ? acc.concat(i): acc), []);

    if (emptySquaresIndexes.length === 0){
        return squares
    }

    // ~~~ BEST MOVE: WIN THE GAME ~~~
    const winningMove = tryWinningMove(squares, emptySquaresIndexes, marker)

    if (winningMove !== null ) {
        console.log(marker, '- BEST MOVE: WIN THE GAME')
        squares[winningMove] = marker;
        return squares
    }

    //~~~~~ SECOND BEST MOVE: BLOCK A WINNING MOVE FROM YOUR ADVERSARY ~~~~
    const oponentMarker = switchPlayer(marker)
    const winningMoveFromRival = tryWinningMove(squares, emptySquaresIndexes, oponentMarker)

    if (winningMoveFromRival !== null ) {
        console.log(marker, '- SECOND BEST MOVE: BLOCK A WINNING MOVE FROM YOUR ADVERSARY')
        squares[winningMoveFromRival] = marker;
        return squares
    }

    //~~~~~ THIRD BEST MOVE: MARK THE SQUARE IN THE BOARD'S CENTER
    if (emptySquaresIndexes.includes(4)) {
        console.log(marker, "- THIRD BEST MOVE: MARK THE SQUARE IN THE BOARD'S CENTER")
        squares[4] = marker;
        return squares
    }

    //~~ FORTH BEST MOVE: MARK ANY CORNER SQUARE AVAILABLE
    const cornerSquares = [ 0, 2, 6, 8 ]
    const emptyCornerSquares = []
    for (const cornerSquare of cornerSquares) {
        if (emptySquaresIndexes.includes(cornerSquare)){
            emptyCornerSquares.push(cornerSquare)
        }
    }

    const emptyCornerSquare = pickEmptySquareRandomly(emptyCornerSquares)
    if (cornerSquares.includes(emptyCornerSquare)) {
        console.log(marker, "- FORTH BEST MOVE: MARK ANY CORNER SQUARE AVAILABLE")
        squares[emptyCornerSquare] = marker;
        return squares
    }

    // ~~~ RANDOM PLAY ~~~
    const randomIndex = pickEmptySquareRandomly(emptySquaresIndexes)
    console.log(marker, "- RANDOM PLAY")
    squares[randomIndex] = marker;
    return squares
}