import math
import random

def pickEmptySquareRandomly(emptySquaresIndexes):
    randomIndex = math.floor(random.random() * len(emptySquaresIndexes))
    randomEmptySquareIndex = emptySquaresIndexes[randomIndex]
    
    return randomEmptySquareIndex