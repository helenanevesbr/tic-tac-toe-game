import React from 'react';
import Board from './Board';
import calculateWinner from '../calculatewinner';
import aiPlay from '../aiplay';

/*This component manages the game state and renders the Board component*/

/* In my previous code, I was calling for aiPlay() in handleClick(), supposedly after the click settled a new game state.
The problem was that the end-user could do multiple clicks before React realized it was the AI's turn to play.
What was the reason for the bug? Well, setState is asyncronuys.
In order to trigger aiPlay(), one condition had to be met: xIsNext had to be false.
I had to be sure setState had already changed the Game state, including setting xIsNext to false, before testing this condition.
The condition was not immediatly met, aiPlay() was not called, and end-user was free to mark more squares before the state was finally updated.
What I'll do now is use componentDidUpdate() to make sure I'll call aiPlay() immediatly after setState() is finished with it's task
*/

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
      /*prevState is an object that contains the previous state and props of the component.
      I don't need to explicitly set a history property to prevState because React handles this for me.
      When the Game component updates, React automatically stores the previous state of the component and passes it to componentDidUpdate as prevState.*/

      const history = this.state.history.slice();
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      
      const new_squares = aiPlay(squares, this.state.xIsNext);

      this.setState({
        history: history.concat([{
          squares: new_squares,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
        isAiPlaying: false, // set isAiPlaying back to false after the AI has played
      });
    }
  }


  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      /*squares[i] returns the symbol ('X' or 'O') at the index i of the squares array.
      If the square clicked is already filled, the value will be either 'X' or 'O', which is converted to Boolean value as True.
      If the square is empty, the value will be null.*/

      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        /*It creates a new array with the existing history array and a new element.
        The new element is an object with a single property squares, which has the value of the squares array that was just updated with the new move.*/

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