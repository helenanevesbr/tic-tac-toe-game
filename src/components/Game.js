import React from 'react';
import Board from './Board';
import calculateWinner from  '../external/client.mjs'
import aiPlay from '../models/ai_play.mjs';

/*This component manages the game state and renders the Board component*/

const initialState = {
  squares: Array(9).fill(null),
  xIsNext: true,
  isAiPlaying: false,
  winner: null,
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.isAiPlaying) {
      const squares = this.state.squares.slice();
      
      const opponentIsWinner = await calculateWinner(squares); //since this is asyn, it was returning just an object Promise.

      if (opponentIsWinner){ // since every object inside an if converts to a positive, it was throwing a false positive at the first move.
        this.setState({
          squares: squares,
          isAiPlaying: false,
          winner: opponentIsWinner
        });
        return
      }

      const newSquares = aiPlay(squares, 'O');

      const aiIsWinner = await calculateWinner(newSquares);

      this.setState({
        squares: newSquares,
        xIsNext: !this.state.xIsNext,
        isAiPlaying: false,
        winner: aiIsWinner,
      });
    }
  }


  handleClick(i) {
    const squares = this.state.squares.slice();

    if (this.state.winner || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      isAiPlaying: true,
    });

  }

  resetGame(){
    this.setState(initialState)
  }

  render() {
    const squares = this.state.squares
    const winner = this.state.winner;

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (squares.every(square => square != null)) {
      status = 'There was a tie.';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="game">
          <div className="game-status">
            {status}
          </div>
          <div className="game-board">
            <Board
              squares={squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-reset">
            <button onClick={() => this.resetGame()}>Reset game</button>
          </div>
        </div>
        <div className="author">
          <div>This game was developed by Helena Neves.</div>
          <div>Click <a href='https://github.com/helenanevesbr/tic-tac-toe-game'>here</a> to see it's repository.</div>
        </div>
      </div>
    );
  }
}

export default Game;