import calculateWinner from "./calculate_winner";

export default function tryWinningMove(currentBoard, emptySquaresIndexes, marker) {

    for (const emptySquare of emptySquaresIndexes) {
        const newSquares = currentBoard.slice()

        newSquares[emptySquare] = marker
    
        if (calculateWinner(newSquares)) {
            console.log(marker, `can win immediatly by marking square ${emptySquare}`)
            return emptySquare
        }
    }
    
    return null
}