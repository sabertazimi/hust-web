import config from '../ai.json'

import { AIMode } from '../constants'
import MCTS from './mcts'

class AI {
  constructor(_config) {
    this.config = _config || {}
    this.config.mode = this.config.defaultMode || AIMode.EASY
  }

  setMode(mode) {
    this.config.mode = mode || AIMode.EASY
  }

  bestPlay(currentState) {
    switch (this.config.mode) {
      case AIMode.EASY:
        MCTS.runSearch(currentState, 0.1)
        break
      case AIMode.MEDIUM:
        MCTS.runSearch(currentState, 1)
        break
      case AIMode.HARD:
        MCTS.runSearch(currentState, 3)
        break
      default:
        MCTS.runSearch(currentState, 1)
        break
    }

    return MCTS.bestPlay(currentState)
  }
}

const ai = new AI(config)

export default ai
