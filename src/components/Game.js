import React from 'react';
import Board from './Board';
import calculateWinner from '../calculate_winner';
import aiPlay from '../ai_play';

/*This component manages the game state and renders the Board component*/

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      isAiPlaying: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isAiPlaying && this.state.history !== prevState.history) {

      const history = this.state.history.slice();
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      
      const new_squares = aiPlay(squares, 'O');

      this.setState({
        history: history.concat([{
          squares: new_squares,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
        isAiPlaying: false,
      });
    }
  }


  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
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
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      isAiPlaying: true,
    });

  }


  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }


  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {

      const desc = move ?
        'Go to move #' + move :
        'Go to game start';

      return (
        <li key={move}>
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

export default Game;