from winning_combination_of_squares import winningIndexesCombinations
from flask import Flask, request
app = Flask(__name__)


@app.route('/calculatewinner', methods = ['POST'])
def calculateWinner():
    data = request.get_json()
    squares = data['squares']

    for i in range(len(winningIndexesCombinations)):
        a, b, c = winningIndexesCombinations[i]
        if squares[a] and squares[a] == squares[b] and squares[a] == squares[c]:
            return { 
               "winner": squares[a] 
            }
    return { "winner" : None }

@app.route('/aiplay', methods = ['POST'])
def aiPlay():
    return "I've seen you POST on AI Play ;)"

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)