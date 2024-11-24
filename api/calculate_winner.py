from winning_combination_of_squares import winningIndexesCombinations

def calculateWinner(squares):
    for winningCombination in winningIndexesCombinations:
        a, b, c = winningCombination

        # if the same symbol exists in a group of three squares from one of the winning combination, we have a winner
        if squares[a] and squares[a] == squares[b] and squares[a] == squares[c]:
            return { 
               "winner": squares[a] 
            }
    return { "winner" : None }