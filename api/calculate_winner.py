from winning_combination_of_squares import winningIndexesCombinations

def calculateWinner(squares):
    for i in range(len(winningIndexesCombinations)):
        a, b, c = winningIndexesCombinations[i]
        if squares[a] and squares[a] == squares[b] and squares[a] == squares[c]:
            return { 
               "winner": squares[a] 
            }
    return { "winner" : None }