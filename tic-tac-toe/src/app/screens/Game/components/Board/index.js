import React, { Component } from 'react';

import Square from '../Square';

import styles from './styles.module.scss';

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

class Board extends Component {
  state = {
    squares: Array(9).fill(null),
    xIsNext: true
  };

  handleClick = i => {
    this.setState((prevState) => {
      const squaresCopy = [...prevState.squares];
      squaresCopy[i] = prevState.xIsNext ? 'X' : 'O';
      return {
        squares: squaresCopy,
        xIsNext: !prevState.xIsNext
      };
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={this.handleClick}
        squareNumber={i}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status = '';
    if (winner) {
      status = `Winner: ' ${winner}`;
    } else {
      status = `Next player: '  ${(this.state.xIsNext ? 'X' : 'O')}`;
    }
    return (
      <div>
        <div className={styles.status}>{status}</div>
        <div className={styles.boardRow}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className={styles.boardRow}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className={styles.boardRow}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;

