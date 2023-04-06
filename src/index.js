import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

/* Se clicarmos em qualquer passo no histórico do jogo, o tabuleiro do Jogo da Velha deve atualizar imediatamente para mostrar como ficou depois que aquele passo ocorreu.

Para isso, nós...
  - Adicionamos a propriedade stepNumber ao state do componente Game para indicar qual etapa do jogo estamos visualizando no momento.

  - Implementamos o método jumpTo para atualizar o stepNumber ao clicar no <button> "Go to".

  - Modificamos a constante current do método render do componente Game para deixar de renderizar sempre a última jogada e passar a renderizar apenas a jogada selecionada atualmente (baseada em this.state.stepNumber).

  - Modificamos método handleClick para atualizar stepNumber após preenchermos um quadrado do jogo. Desta forma, não ficaremos presos mostrando a mesma jogada após uma nova ter sido feita.

  - Modificamos a constante history no método handleClick para cortar (slice()) a array baseada no stepNumber. Desta maneira, se “voltarmos no tempo” e fizermos um novo movimento a partir desse ponto, jogaremos fora toda a história “futura” que agora estaria incorreta.
*/

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0, //adicionamos a propriedade stepNumber ao state inicial do componente Game para indicar qual passo estamos visualizando no momento. Ele reflete a jogada mostrada ao usuário nesse momento.
      xIsNext: true
    };
  }

  handleClick(i) {

    const history = this.state.history.slice(0, this.state.stepNumber + 1); //Isso garante que, se “voltarmos no tempo” e fizermos um novo movimento a partir desse ponto, jogaremos fora toda a história “futura” que agora estaria incorreta.

    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),

      stepNumber: history.length, //stepNumber reflete a jogada mostrada ao usuário nesse momento. Após fazermos uma nova jogada, precisamos atualizar esse valor. Isso certifica que não ficaremos presos mostrando a mesma jogada após uma novo ter sido feita.

      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({ //O jumpTo atualizará o valor em stepNumber
      stepNumber: step,
      xIsNext: (step % 2) === 0, //definimos xIsNext para true caso o número que estejamos atribuindo a stepNumber seja par
    });
  }

  render() {

    const history = this.state.history;

    const current = history[this.state.stepNumber]; // Modificamos o método render do componente Game para deixar de renderizar sempre a última jogada e passar a renderizar apenas a jogada selecionada atualmente, de acordo com stepNumber.

    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {

      const desc = move ?
        'Go to move #' + move :
        'Go to game start';

      return (
        <li key={move}>{/*
        No histórico do Jogo da Velha, cada jogada anterior tem um único ID associado a ela: é o número sequencial da jogada.
        As jogadas nunca são reordenadas, apagadas, ou inseridas no meio, então é seguro utilizar o index da jogada como a chave.*/}

          <button onClick={() => this.jumpTo(move)}>{desc}</button>

        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}


function calculateWinner(squares) {

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    
    if (
      squares[a] && squares[a] ===
      
      squares[b] && squares[a] === squares[c]) {
        return squares[a];
    }
  }
  return null;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);