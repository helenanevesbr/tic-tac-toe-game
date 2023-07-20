from try_winning_move import tryWinningMove
from pick_empty_square_randomly import pickEmptySquareRandomly

def switchPlayer(marker):
    return "O" if marker == "X" else "X"

def aiPlay(squares, marker):

    emptySquaresIndexes = [i for i, square_value in enumerate(squares) if square_value == None]

    if len(emptySquaresIndexes) == 0:
        return squares


    ''' ~~~ BEST MOVE: WIN THE GAME ~~~ '''
    winningMove = tryWinningMove(squares, emptySquaresIndexes, marker)

    if winningMove != None:
        print(marker, '- BEST MOVE: WIN THE GAME')
        squares[winningMove] = marker
        return squares


    '''~~~~~ SECOND BEST MOVE: BLOCK A WINNING MOVE FROM YOUR ADVERSARY ~~~~'''
    oponentMarker = switchPlayer(marker)
    winningMoveFromRival = tryWinningMove(squares, emptySquaresIndexes, oponentMarker)

    if winningMoveFromRival != None:
        print(marker, '- SECOND BEST MOVE: BLOCK A WINNING MOVE FROM YOUR ADVERSARY')
        squares[winningMoveFromRival] = marker
        return squares


    '''~~~~~ THIRD BEST MOVE: MARK THE SQUARE IN THE BOARD'S CENTER'''
    if 4 in emptySquaresIndexes:
        print(marker, "- THIRD BEST MOVE: MARK THE SQUARE IN THE BOARD'S CENTER")
        squares[4] = marker
        return squares


    '''~~ FORTH BEST MOVE: MARK ANY CORNER SQUARE AVAILABLE'''
    cornerSquares = [ 0, 2, 6, 8 ]
    emptyCornerSquares = []
    for cornerSquare in cornerSquares:
        if cornerSquare in emptySquaresIndexes:
            emptyCornerSquares.append(cornerSquare)

    if emptyCornerSquares != []:
        emptyCornerSquare = pickEmptySquareRandomly(emptyCornerSquares)
        if emptyCornerSquare in cornerSquares:
            print(marker, "- FORTH BEST MOVE: MARK ANY CORNER SQUARE AVAILABLE")
            squares[emptyCornerSquare] = marker
            return squares


    '''~~~ RANDOM PLAY ~~~'''
    randomIndex = pickEmptySquareRandomly(emptySquaresIndexes)
    print(marker, "- RANDOM PLAY")
    squares[randomIndex] = marker
    return squares