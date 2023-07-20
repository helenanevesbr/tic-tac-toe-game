from calculate_winner import calculateWinner
from ai_play import aiPlay
from flask import Flask, request
app = Flask(__name__)

@app.after_request
def add_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response


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
    app.run(host='0.0.0.0', port=5000)