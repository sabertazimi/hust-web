/**
 * Score Board optimization
 */

import {
  EMPTY,
  ROWS,
  COLS,
  Score,
} from '../constants';

import {
  BoardVisitor,
} from '../utils';

const SBTS = {
  /**
   * @param {object} currentState
   */
  generateScoreBoard(currentState) {
    const scoreBoard = [];

    for (let i = 0; i < ROWS; i += 1) {
      scoreBoard[i] = new Array(COLS);

      for (let j = 0; j < COLS; j += 1) {
        scoreBoard[i][j] = 0;
      }
    }

    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, 1],
      [1, -1],
      [-1, -1],
      [1, 1],
    ];

    let humanCount = 0;
    let aiCount = 0;
    let emptyCount = 0;
    let axisFlag = 0;

    const humanCB1 = (state, play, xdir, ydir, step) => {
      const {
        board,
        player,
      } = state;
      const {
        row,
        col,
      } = play;

      const currentplayer = board[row + ydir * step][col + xdir * step];
      if (currentplayer === -player) {
        humanCount += 1;
        return true;
      }

      if (currentplayer === EMPTY) {
        emptyCount += 1;
      }

      return false;
    };

    const humanCB2 = (state, play) => {
      if (axisFlag === 0) {
        axisFlag += 1;
        return true;
      }

      const {
        row,
        col,
      } = play;

      switch (humanCount) {
        case 1:
          scoreBoard[row][col] += Score.Kill2;
          break;
        case 2:
          if (emptyCount === 1) {
            scoreBoard[row][col] += Score.Kill3_1;
          } else if (emptyCount === 2) {
            scoreBoard[row][col] += Score.Kill3_2;
          }
          break;
        case 3:
          if (emptyCount === 1) {
            scoreBoard[row][col] += Score.Kill4_1;
          } else if (emptyCount === 2) {
            scoreBoard[row][col] += Score.Kill4_2;
          }
          break;
        case 4:
          scoreBoard[row][col] += Score.Kill5;
          break;
        default:
          break;
      }

      humanCount = 0;
      emptyCount = 0;
      axisFlag = 0;

      return true;
    };

    const aiCB1 = (state, play, xdir, ydir, step) => {
      const {
        board,
        player,
      } = state;
      const {
        row,
        col,
      } = play;

      const currentplayer = board[row + ydir * step][col + xdir * step];

      if (currentplayer === EMPTY) {
        emptyCount += 1;
        return false;
      }

      if (currentplayer !== -player) {
        aiCount += 1;
        return true;
      }

      return false;
    };

    const aiCB2 = (state, play) => {
      if (axisFlag === 0) {
        axisFlag += 1;
        return true;
      }

      const {
        row,
        col,
      } = play;

      switch (aiCount) {
        case 0:
          scoreBoard[row][col] += Score.Live1;
          break;
        case 1:
          scoreBoard[row][col] += Score.Live2;
          break;
        case 2:
          if (emptyCount === 1) {
            scoreBoard[row][col] += Score.Dead3;
          } else if (emptyCount === 2) {
            scoreBoard[row][col] += Score.Live3;
          }
          break;
        case 3:
          if (emptyCount === 1) {
            scoreBoard[row][col] += Score.Dead4;
          } else if (emptyCount === 2) {
            scoreBoard[row][col] += Score.Live4;
          }
          break;
        case 4:
          scoreBoard[row][col] += Score.Live5;
          break;
        default:
          break;
      }

      aiCount = 0;
      emptyCount = 0;
      axisFlag = 0;

      return true;
    };

    for (let i = 0; i < ROWS; i += 1) {
      for (let j = 0; j < COLS; j += 1) {
        if (currentState.board[i][j] === EMPTY) {
          BoardVisitor.countOnDirections(currentState, {
            row: i,
            col: j,
          }, directions, 4, humanCB1, humanCB2);
          BoardVisitor.countOnDirections(currentState, {
            row: i,
            col: j,
          }, directions, 4, aiCB1, aiCB2);
        }
      }
    }

    return scoreBoard;
  },

  bestPlays(currentState) {
    let maxScore = 0;
    const bestPlays = [];
    const scoreBoard = this.generateScoreBoard(currentState);

    for (let i = 0; i < ROWS; i += 1) {
      for (let j = 0; j < COLS; j += 1) {
        if (currentState.board[i][j] === EMPTY) {
          if (scoreBoard[i][j] > maxScore) {
            maxScore = scoreBoard[i][j];
            bestPlays.splice(0);
            bestPlays.push({
              row: i,
              col: j,
            });
          } else if (scoreBoard[i][j] === maxScore) {
            bestPlays.push({
              row: i,
              col: j,
            });
          }
        }
      }
    }

    return bestPlays;
  },

  bestPlay(currentState) {
    const bestPlays = this.bestPlays(currentState);

    if (bestPlays.length) {
      const randomNum = Math.floor(Math.random() * bestPlays.length);
      return bestPlays[randomNum];
    }

    return {
      row: -1,
      col: -1,
    };
  },
};

export default SBTS;
