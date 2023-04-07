import React from 'react';
import Board from './Board';
import calculateWinner from '../calculatewinner';
import aiPlay from '../aiplay';

/*This component manages the game state and renders the Board component*/

/*I've added that last if statement to my handeClick.
Now if an end user clicks on a square and that does not finishes the game, it will be my AI's turn to make a move
But in order to make a move, it needs to "know" the current state of the Board: which squares are still empty?*/

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
    /*state is a property of the Game component class, not a standalone variable.
    That is why whenever we update the game state, we need to refer to this property using this.state, instead of just "state"*/

  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    /*See? In order to get a copy of the current history and the last state of the squares, we need "this.state"
    Mind you, this is what history looks like if our first move is X on square number 9, then O on square 1:

    ~~ HISTORY ~~
      history [{…}]
        0: {squares: Array(9)} ---> squares: (9) [null, null, null, null, null, null, null, null, null]
        length: 1[[Prototype]]: Array(0)
      history (2) [{…}, {…}]
        0: {squares: Array(9)} ---> squares: (9) [null, null, null, null, null, null, null, null, null]
        1: {squares: Array(9)} ---> squares: (9) [null, null, null, null, null, null, null, null, 'X']
        length: 2[[Prototype]]: Array(0)

    What we are doing with local variable "current" is getting the last item in the history array:
    - first click will set current = history[0], an array in which all squares are null
    - second click will set current = history[1], an array in which the last square has value 'X'
    Notice that, since handleClick() has not yet set a new state, the current state of the board is before the most recent click changes the board.
    */

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
    });

    if (!calculateWinner(squares) && !this.state.xIsNext) {
        aiPlay(history, this.state, this.setState);
        /*history, stepNumber, and xIsNext are also properties of the Game component, just like state.
        They are all stored as properties of the Game component's state object in the constructor.

        So how come I need "this.state" to pass the state as an argument, but I don't need "this.state.history", just "history"?
        It's because the argument for aiPlay() is not the history property stored in the state object
        Rather, it's the local variable declared within the handleClick() method, line 29*/
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