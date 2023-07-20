from calculate_winner import calculateWinner

def tryWinningMove(currentBoard, emptySquaresIndexes, marker):

    for emptySquare in emptySquaresIndexes:
        newSquares = currentBoard.copy()
        newSquares[emptySquare] = marker

        if calculateWinner(newSquares)["winner"]:
            return emptySquare
    
    return None