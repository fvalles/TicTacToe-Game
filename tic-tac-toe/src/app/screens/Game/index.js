import React, { Component } from 'react';

import styles from './styles.module.scss';
import Board from './components/Board';

class Game extends Component {
  state = {
    history: [{
      squares: Array(9).fill(null),
      squareFilled: 0
    }],
    stepNumber: 0,
    xIsNext: true
  };

  handleClick = i => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squaresCopy = [...current.squares];
    if (this.calculateWinner(squaresCopy) || squaresCopy[i]) {
      return;
    }
    this.setState((prevState) => {
      squaresCopy[i] = prevState.xIsNext ? 'X' : 'O';
      return {
        history: history.concat(
          { squares: squaresCopy,
            squareFilled: i }
        ),
        xIsNext: !prevState.xIsNext,
        stepNumber: history.length
      };
    });
  }

  jumpTo(step) {
    this.setState(() => ({
      stepNumber: step,
      xIsNext: step % 2 === 0
    }));
  }

  render() {
    const history = [...this.state.history];
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    const moves = history.map((hisMoveDetail, move) => {
      const { squareFilled } = hisMoveDetail;
      const sqFilledPos = this.calculateFilledPos(squareFilled);
      const desc = move ? `Go to move #${move} ${sqFilledPos}` : 'Go to game start';
      return (
        <li key={move.toString()}>
          <button
            type="button"
            // eslint-disable-next-line react/jsx-no-bind
            onClick={() => this.jumpTo(move)}
            className={move === this.state.stepNumber
              ? styles.historySelectedButton
              : styles.historyIdleButton}
          >
            { desc }
          </button>
        </li>
      );
    });

    let status = '';
    if (winner) {
      status = `Winner: ${winner[0]}`;
    } else {
      status = `Next player: ${(this.state.xIsNext ? 'X' : 'O')}`;
    }

    return (
      <div className={styles.game}>
        <div className={styles.gameBoard}>
          <Board
            squares={current.squares}
            onClick={this.handleClick}
            winnerSqs={winner ? winner[1] : null}
          />
        </div>
        <div className={styles.gameInfo}>
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }

  calculateWinner(squares) {
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
        return [squares[a], [a, b, c]];
      }
    }
    return null;
  }

  calculateFilledPos(squareFilled) {
    let row = 1;
    let col = 1;

    switch (squareFilled) {
      case 0:
        row = 1;
        col = 1;
        break;
      case 1:
        row = 1;
        col = 2;
        break;
      case 2:
        row = 1;
        col = 3;
        break;
      case 3:
        row = 2;
        col = 1;
        break;
      case 4:
        row = 2;
        col = 2;
        break;
      case 5:
        row = 2;
        col = 3;
        break;
      case 6:
        row = 3;
        col = 1;
        break;
      case 7:
        row = 3;
        col = 2;
        break;
      case 8:
        row = 3;
        col = 3;
        break;
      default:
        row = 'An error occurred';
        col = 'An error occurred';
        break;
    }

    return `(row: ${row}, col: ${col})`;
  }
}

export default Game;
