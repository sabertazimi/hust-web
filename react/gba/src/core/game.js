import {
  EMPTY,
  AIMode,
} from '../constants';

import SM from './stateMachine';
import AI from './ai';

const Game = {
  getInitState() {
    const state = SM.getInitState();
    SM.storeState(state);
    return state;
  },

  loadState() {
    return SM.loadState();
  },

  changeMode() {
    switch (this.ai.mode) {
      case AIMode.EASY:
        AI.setMode(AIMode.MEDIUM);
        break;
      case AIMode.MEDIUM:
        AI.setMode(AIMode.HARD);
        break;
      case AIMode.HARD:
        AI.setMode(AIMode.EASY);
        break;
      default:
        AI.setMode(AIMode.EASY);
        break;
    }
  },

  handleHumanPlay(state, play) {
    if (state.board[play.row][play.col] === EMPTY) {
      let newState = SM.nextState(state, play);

      if (newState.winner === EMPTY) {
        const aiPlay = AI.bestPlay(newState);

        if (aiPlay.col !== -1 && aiPlay.row !== -1) {
          newState = SM.nextState(newState, aiPlay);
        }
      }

      SM.storeState(newState);
      return newState;
    }

    SM.storeState(state);
    return state;
  },
};

Game.ai = AI.config;

export default Game;
