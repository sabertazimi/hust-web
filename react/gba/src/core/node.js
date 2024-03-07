import { Hash } from '../utils'

class Node {
  constructor(parent, play, state, unexpandedPlays) {
    this.play = play
    this.state = state

    this.nPlays = 0
    this.nWins = 0

    this.parent = parent
    this.children = new Map()

    for (let i = 0; i < unexpandedPlays.length; i += 1) {
      const curPlay = unexpandedPlays[i]
      this.children.set(Hash.play(curPlay), {
        play: curPlay,
        node: null,
      })
    }
  }

  childNode(play) {
    const child = this.children.get(Hash.play(play))

    if (child === undefined) {
      throw new Error('No such play!')
    }

    return child.node
  }

  expand(play, childState, unexpandedPlays) {
    if (!this.children.has(Hash.play(play))) {
      throw new Error('No such play!')
    }

    const childNode = new Node(this, play, childState, unexpandedPlays)
    this.children.set(Hash.play(play), { play, node: childNode })

    return childNode
  }

  allPlays() {
    const ret = []

    this.children.forEach(child => ret.push(child.play))

    return ret
  }

  unexpandedPlays() {
    const ret = []

    this.children.forEach(child => {
      if (child.node === null) {
        ret.push(child.play)
      }
    })

    return ret
  }

  isFullyExpanded() {
    for (const child of this.children.values()) {
      if (child.node === null) {
        return false
      }
    }

    return true
  }

  isLeaf() {
    if (this.children.size === 0) {
      return true
    }

    return false
  }

  getUCB1(biasParam) {
    const exploitTerm = this.nWins / this.nPlays
    const exploreTerm = Math.sqrt(
      (biasParam * Math.log(this.parent.nPlays)) / this.nPlays
    )
    return exploitTerm + exploreTerm
  }
}

export default Node
