import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

class Square extends Component {
  handleClick = () => {
    this.props.onClick(this.props.squareNumber);
  }

  render() {
    const { winnerSqs, squareNumber, value } = this.props;

    const highlightSq = winnerSqs
      ? squareNumber === winnerSqs[0] ||
      squareNumber === winnerSqs[1] ||
      squareNumber === winnerSqs[2]
      : false;

    const className = highlightSq
      ? styles.squareWinner
      : styles.square;

    return (
      <button
        type="button"
        className={className}
        onClick={this.handleClick}
      >
        { value }
      </button>
    );
  }
}

Square.propTypes = {
  squareNumber: PropTypes.number,
  value: PropTypes.string,
  winnerSqs: PropTypes.arrayOf(PropTypes.number),
  onClick: PropTypes.func
};

export default Square;
