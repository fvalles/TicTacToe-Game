import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Square from '../Square';

import styles from './styles.module.scss';

class Board extends Component {
  /* state = {
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
  }*/

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={this.props.onClick}
        squareNumber={i}
      />
    );
  }

  render() {
    return (
      <div>
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

Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func
};

export default Board;
