import tryWinningMove from "./try_winning_move";
import pickEmptySquareRandomly from "./pick_empty_square_randomly";

export default function aiPlay(squares, marker) {

    const emptySquaresIndexes = squares.reduce((acc, square_value, i) => (square_value === null ? acc.concat(i): acc),[]);

    // ~~~ BEST MOVE: WIN THE GAME ~~~

    const winningMove = tryWinningMove(squares, emptySquaresIndexes, 'O')

    if (winningMove) {
        console.log('BEST MOVE: WIN THE GAME')
        squares[winningMove] = 'O';
        return squares
    }

    //~~~~~ SECOND BEST MOVE: BLOCK A WINNING MOVE FROM YOUR ADVERSARY ~~~~
    
    const winning_move_from_rival = tryWinningMove(squares, emptySquaresIndexes, 'X')

    if (winning_move_from_rival) {
        console.log('SECOND BEST MOVE: BLOCK A WINNING MOVE FROM YOUR ADVERSARY')
        squares[winning_move_from_rival] = marker;
        return squares
    }

    //~~~~~ THIRD BEST MOVE: MARK THE SQUARE IN THE BOARD'S CENTER
    if (emptySquaresIndexes.includes(4)) {
        console.log("THIRD BEST MOVE: MARK THE SQUARE IN THE BOARD'S CENTER")
        squares[4] = marker;
        return squares
    }

    //~~ FORTH BEST MOVE: MARK ANY CORNER SQUARE AVAILABLE
    const cornerSquares = [0,2,6,8]
    const emptyCornerSquares = []
    for (let cornerSquare of cornerSquares) {
        if (emptySquaresIndexes.includes(cornerSquare)){
            emptyCornerSquares.push(cornerSquare)
        }
    }

    const emptyCornerSquare = pickEmptySquareRandomly(emptyCornerSquares)
    if (emptyCornerSquare) {
        console.log("FORTH BEST MOVE: MARK ANY CORNER SQUARE AVAILABLE")
        squares[emptyCornerSquare] = marker;
        return squares
    }

    // ~~~ RANDOM PLAY ~~~
    const randomIndex = pickEmptySquareRandomly(emptySquaresIndexes)
    if (randomIndex) {
        console.log("RANDOM PLAY")
        squares[randomIndex] = marker;
        return squares
    }
    return squares
}