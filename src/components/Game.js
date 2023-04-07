import React from 'react';
import Board from './Board';
import calculateWinner from '../calculatewinner';
import aiPlay from '../aiplay';

/*This component manages the game state and renders the Board component*/

/*At the moment, the Square components' state is changed by a click from the end user.
However, I want the player to dispute against an AI, and this AI won't be clicking on the component, but rather passing a value directly.

Therefore I have to change how handleClick works: it needs to call my aiPlay() function after the end user makes it's move.

This is what I will do now*/

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    /*This function updates the game state when a square is clicked.
    To implement my AI player's logic, I'll create a function called aiPlay()
    Therefore, handleClick() needs to include a call to the aiPlay() function when it is not the player's turn.*/

    const history = this.state.history.slice(0, this.state.stepNumber + 1);

    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    /*The handleClick() function first checks if the clicked square is already filled.
    If it isn't... */

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),

      stepNumber: history.length,

      xIsNext: !this.state.xIsNext,
    });
    /*... then the square is valid, and the function updates the game state as before.
    However, now it also...*/

    if (!calculateWinner(squares) && !this.state.xIsNext) {
      /*... checks if the game is not over and it's not the player's turn.
      If both of these conditions are true...*/

        aiPlay();
        /*it calls the aiPlay() function*/
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

console.log("Game loaded")

export default Game;