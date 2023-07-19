import math

def pickEmptySquareRandomly(emptySquaresIndexes):
    randomIndex = math.floor(math.random() * emptySquaresIndexes.length)
    randomEmptySquareIndex = emptySquaresIndexes[randomIndex]
    
    return randomEmptySquareIndex