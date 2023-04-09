import calculateWinner from "./calculate_winner.mjs";

export default function tryWinningMove(currentBoard, emptySquaresIndexes, marker) {

    for (const emptySquare of emptySquaresIndexes) {
        const newSquares = currentBoard.slice()

        newSquares[emptySquare] = marker
    
        if (calculateWinner(newSquares)) {
            return emptySquare
        }
    }
    
    return null
}