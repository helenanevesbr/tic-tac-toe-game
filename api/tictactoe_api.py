from calculate_winner import calculateWinner
from ai_play import aiPlay
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/calculatewinner', methods = ['POST'])
def calculate_winner():
    data = request.get_json()
    squares = data['squares']
    return calculateWinner(squares)


@app.route('/aiplay', methods = ['POST'])
def ai_play():
    data = request.get_json()
    squares = data['squares']
    marker = data['marker']
    new_squares = aiPlay(squares, marker)
    return { "squares" : new_squares }

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=8000)