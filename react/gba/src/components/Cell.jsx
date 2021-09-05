import React from 'react';
import PropTypes from 'prop-types';

import {
  CELL_SIZE,
  BLACK,
  WHITE,
} from '../constants';

import './Cell.scss';

const Cell = (props) => {
  const {
    row,
    col,
    val,
  } = props;

  const styles = {
    width: CELL_SIZE,
    height: CELL_SIZE,
    top: row * CELL_SIZE,
    left: col * CELL_SIZE,
  };

  let innerClass = '';

  switch (val) {
    case BLACK:
      innerClass = 'black';
      break;
    case WHITE:
      innerClass = 'white';
      break;
    default:
      innerClass = '';
      break;
  }

  return (
    <div {...props} className="cell" style={styles}>
      <div className={innerClass} />
    </div>
  );
};

Cell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  val: PropTypes.number.isRequired,
};

export default Cell;
