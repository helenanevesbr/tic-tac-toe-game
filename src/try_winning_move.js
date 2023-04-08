import calculateWinner from "./calculate_winner";

export default function tryWinningMove(currentBoard, emptySquaresIndexes, marker) {
    let newSquares = currentBoard.slice()

    for (let EmptySquare of emptySquaresIndexes) {
        newSquares[EmptySquare] = marker
    
        if (calculateWinner(newSquares)){
            console.log(`You can win immediatly by marking square ${EmptySquare}`)
            return EmptySquare
        }
    
        newSquares = currentBoard.slice()
    }
    return null
}