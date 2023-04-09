import React from 'react';
import Board from './Board';
import calculateWinner from '../calculate_winner';
import aiPlay from '../ai_play';

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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isAiPlaying) {
      const squares = this.state.squares.slice();
      
      const opponentIsWinner = calculateWinner(squares);

      if (opponentIsWinner){
        this.setState({
          squares: squares,
          isAiPlaying: false,
          winner: opponentIsWinner
        });
        return
      }

      const new_squares = aiPlay(squares, 'O');

      const aiIsWinner = calculateWinner(new_squares);

      this.setState({
        squares: new_squares,
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
    const winner = this.state.winner; // use the winner state instead of calculating the winner on every render

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (squares.every(square => square != null)) {
      status = 'There was a tie';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.resetGame()}>Reset game</button>
        </div>
      </div>
    );
  }
}

export default Game;