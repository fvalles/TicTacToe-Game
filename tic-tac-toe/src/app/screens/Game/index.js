import React, { Component } from 'react';

import styles from './styles.module.scss';
import Board from './components/Board';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Game extends Component {
  state = {
    history: [{
      squares: Array(9).fill(null)
    }],
    xIsNext: true
  };

  handleClick = i => {
    const history = [...this.state.history];
    const current = history[history.length - 1];
    const squaresCopy = [...current.squares];
    if (calculateWinner(squaresCopy) || squaresCopy[i]) {
      return;
    }
    this.setState((prevState) => {
      squaresCopy[i] = prevState.xIsNext ? 'X' : 'O';
      return {
        history: prevState.history.concat(
          { squares: squaresCopy }
        ),
        xIsNext: !prevState.xIsNext
      };
    });
  }

  render() {
    const history = [...this.state.history];
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status = '';
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${(this.state.xIsNext ? 'X' : 'O')}`;
    }

    return (
      <div className={styles.game}>
        <div className={styles.gameBoard}>
          <Board
            squares={current.squares}
            onClick={this.handleClick}
          />
        </div>
        <div className={styles.gameInfo}>
          <div>{ status }</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
