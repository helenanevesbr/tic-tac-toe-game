import React from 'react';
import Board from './Board';
import calculateWinner from '../calculatewinner';
import aiPlay from '../aiplay';

/*This component manages the game state and renders the Board component*/

/* Now that my AI knows where each empty square currently is, it has to pick one randomly and set its value to either 'X' or 'O'
But how does the AI know which one?
If the end-user is using X, AI can only use O, and when it's the end-user's turn to make a move again, the code needs to know it's time to swap between values.
How does it knows that?*/

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    console.log("squares", squares)

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    console.log("Assign value X or O?", squares[i])
    /* Initially, state.xIsNext is true, so the ? operator will evaluate to true and assign 'X' to the squares[i].
    i is the index of the square which was clicked */

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
    /*The xIsNext state is set to the opposite of its current value using the ! operator, which is the logical NOT operator in JavaScript.
    This means that if the current value of xIsNext is true, it will be set to false, and if it is false, it will be set to true.*/

    if (!calculateWinner(squares) && !this.state.xIsNext) {
      setTimeout(() => {
          console.log("ai play")
          aiPlay(history, this.state, this.setState.bind(this));
      }, 300); // waits for 1 second before executing aiPlay
    }

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