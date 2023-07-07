from flask import Flask, request
app = Flask(__name__)

#POST REQUEST
@app.route('/tictactoe', methods = ['POST'])
def calculateWinner():
    data = request.get_json()
    board = data['board']
    response = "I see you sent a POST message. Here is what you posted: {}".format(board)
    return response

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)

