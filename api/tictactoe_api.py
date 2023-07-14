from winning_combination_of_squares import winningIndexesCombinations
from flask import Flask, request
app = Flask(__name__)

@app.after_request
def add_headers(response):
    print(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response
'''
CORS - Cross-Origin Resource Sharing (Compartilhamento de recursos com origens diferentes) é um mecanismo que usa cabeçalhos adicionais HTTP para informar a um navegador que permita que
um aplicativo Web seja executado em uma origem (domínio) com permissão para acessar recursos selecionados de um servidor em uma origem distinta.
Apesar de ambas a API e a aplicação em React (o Jogo) estarem rodando em localhost, estavam em portas diferentes.
O navegador, e apenas ele, entende isso como um domínio distinto.
As requisições não-GET feitas para API, portanto, eram todas invertidas para OPTIONS.
Esse erro não acontecia, por exemplo, requisitando pelo Postamn, só pelo navegador
'''

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