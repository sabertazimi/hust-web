/**
 * Monte-Carlo tree search algorithm implementation
 */

import { EMPTY } from '../constants'
import { Hash } from '../utils'

import SM from './stateMachine'
import SBTS from './sbts'
import Node from './node'

class MCTS {
  constructor(UCB1ExploreParam = 2) {
    this.UCB1ExploreParam = UCB1ExploreParam
    this.nodes = new Map()
  }

  makeNode(state) {
    if (!this.nodes.has(Hash.state(state))) {
      const unexpandedPlays = SM.legalPlays(state).slice()
      const node = new Node(null, null, state, unexpandedPlays)
      this.nodes.set(Hash.state(state), node)
    }
  }

  select(state) {
    let node = this.nodes.get(Hash.state(state))

    // search down to fully expanded node or leaf node
    // along with bestPlay path
    while (node.isFullyExpanded() && !node.isLeaf()) {
      const plays = node.allPlays()
      let bestPlay
      let bestUCB1 = Number.NEGATIVE_INFINITY

      for (let i = 0; i < plays.length; i += 1) {
        const play = plays[i]
        const childUCB1 = node.childNode(play).getUCB1(this.UCB1ExploreParam)

        if (childUCB1 > bestUCB1) {
          bestPlay = play
          bestUCB1 = childUCB1
        }
      }

      node = node.childNode(bestPlay)
    }

    return node
  }

  expand(node) {
    // get a random one unexpanded play
    const plays = node.unexpandedPlays()
    const play = plays[Math.floor(Math.random() * plays.length)]
    // const bestPlays = SBTS.bestPlays(node.state);
    // const play = plays.find(play1 => bestPlays.some(
    //   play2 => play1.row === play2.row && play1.col === play2.col,
    // )) || plays[Math.floor(Math.random() * plays.length)];

    // expand child node with above play
    const childState = SM.nextState(node.state, play)
    const childUnexpandedPlays = SM.legalPlays(childState)
    const childNode = node.expand(play, childState, childUnexpandedPlays)
    this.nodes.set(Hash.state(childState), childNode)
    return childNode
  }

  simulate(node) {
    let { state } = node
    let winner = SM.checkWinner(state, node.play)

    while (winner === EMPTY) {
      const plays = SM.legalPlays(state)

      if (plays.length === 0)
        break

      const play = plays[Math.floor(Math.random() * plays.length)]
      // const bestPlays = SBTS.bestPlays(state);
      // const play = plays.find(play1 => bestPlays.some(
      //   play2 => play1.row === play2.row && play1.col === play2.col,
      // )) || plays[Math.floor(Math.random() * plays.length)];

      state = SM.nextState(state, play)
      const { winner: newWinner } = state
      winner = newWinner
    }

    return winner
  }

  backpropagate(node, winner) {
    while (node !== null) {
      node.nPlays += 1

      // winner info for parent node
      // node.parent.state.player === winner
      if (node.state.player === -winner)
        node.nWins += 1

      node = node.parent
    }
  }

  runSearch(state, timeout = 3) {
    this.makeNode(state)

    const end = Date.now() + timeout * 1000

    while (Date.now() < end) {
      let node = this.select(state)
      let winner = SM.checkWinner(node.state, node.play)

      if (node.isLeaf() === false && winner === EMPTY) {
        node = this.expand(node)
        winner = this.simulate(node)
      }

      this.backpropagate(node, winner)
    }
  }

  bestPlay(state) {
    this.makeNode(state)

    // if (this.nodes.get(Hash.state(state)).isFullyExpanded() === false) {
    //   throw new Error('Not enough information!');
    // }

    const node = this.nodes.get(Hash.state(state))
    const allPlays = node.allPlays()
    let bestPlay
    let max = Number.NEGATIVE_INFINITY

    for (let i = 0; i < allPlays.length; i += 1) {
      const play = allPlays[i]
      const childNode = node.childNode(play)

      // expanded child node
      if (childNode) {
        const winRate = childNode.nWins / childNode.nPlays

        if (winRate > max) {
          bestPlay = play
          max = winRate
        }
      }
    }

    // downgrade to SBTS
    if (!bestPlay)
      bestPlay = SBTS.bestPlay(state)

    return bestPlay
  }

  getStats(state) {
    const node = this.nodes.get(Hash.state(state))
    const stats = {
      play: node.play,
      nPlays: node.nPlays,
      nWins: node.nWins,
      children: [],
    }

    node.children.forEach((child) => {
      if (child.node === null) {
        stats.children.push({
          play: child.play,
          nPlays: null,
          nWins: null,
        })
      } else {
        stats.children.push({
          play: child.play,
          nPlays: child.node.nPlays,
          nWins: child.node.nWins,
        })
      }
    })

    return stats
  }
}

const mcts = new MCTS()

export default mcts
