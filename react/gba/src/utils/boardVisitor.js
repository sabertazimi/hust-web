import {
  ROWS,
  COLS,
} from '../constants';

const BoardVisitor = {
  /**
   * @param {object} currentState {board, player}
   */
  countOnDirection: (currentState, play, xdir, ydir, range, cb, ...args) => {
    const {
      row,
      col,
    } = play;

    let count = 0;

    for (let i = 1; i <= range; i += 1) {
      if (xdir !== 0 && ((col + xdir * i < 0) || col + xdir * i >= COLS)) {
        break;
      }

      if (ydir !== 0 && ((row + ydir * i < 0) || row + ydir * i >= ROWS)) {
        break;
      }

      if (cb && cb(currentState, play, xdir, ydir, i, ...args)) {
        count += 1;
      } else {
        break;
      }
    }

    return count;
  },
  /**
   * @param {function} cb1 inner callback function (state, play, xdir, ydir, step, ...args)
   * @param {function} cb2 outer callback function (state, play, xdir, ydir, axisCount, ...args)
   * @param  {...any} args arguments to cb1 and cb2 function
   */
  countOnDirections: function countOnDirections(
    currentState,
    play,
    directions, range,
    cb1, cb2, ...args
  ) {
    let count = 0;

    for (let i = 0; i < directions.length; i += 1) {
      let axisCount = 0;
      const axis = directions[i];
      const xdir = axis[0];
      const ydir = axis[1];

      axisCount += this.countOnDirection(currentState, play, xdir, ydir, range, cb1, ...args);

      if (cb2 && cb2(currentState, play, xdir, ydir, axisCount, ...args)) {
        count += 1;
      }
    }

    return count;
  },
};

export default BoardVisitor;
