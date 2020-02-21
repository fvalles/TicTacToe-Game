import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Square from '../Square';

import styles from './styles.module.scss';

class Board extends Component {
  renderSquare(i) {
    const { squares, onClick, winnerSqs } = this.props;

    return (
      <Square
        value={squares[i]}
        onClick={onClick}
        squareNumber={i}
        winnerSqs={winnerSqs}
        key={i.toString()}
      />
    );
  }

  render() {
    return (
      <div>
        {this.createBoard()}
      </div>
    );
  }

  createBoard() {
    const board = [];
    let sqNumber = 0;

    for (let row = 0; row < 3; row++) {
      const squares = [];

      for (let col = 0; col < 3; col++) {
        squares.push(this.renderSquare(sqNumber));
        sqNumber++;
      }

      board.push(
        <div
          className={styles.boardRow}
          key={sqNumber.toString()}
        >
          { squares }
        </div>
      );
    }

    return board;
  }
}

Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.string),
  winnerSqs: PropTypes.arrayOf(PropTypes.number),
  onClick: PropTypes.func
};

export default Board;
