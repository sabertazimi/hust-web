import React from 'react'

import { BLACK, COLS, DEATH, ROWS, WHITE } from '../constants'

import Game from '../core'
import Grid from './Grid'
import Cell from './Cell'

import './GoBang.scss'

class GoBang extends React.Component {
  constructor(props) {
    super(props)
    this.state = Game.loadState()
    this.reset = this.reset.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.changeMode = this.changeMode.bind(this)
  }

  handleClick(row, col) {
    const newState = Game.handleHumanPlay(this.state, {
      row,
      col,
    })

    this.setState(newState)
  }

  reset() {
    this.setState(Game.getInitState())
  }

  changeMode() {
    Game.changeMode()
    const state = Game.loadState()
    this.setState(state)
  }

  render() {
    const { winner, board } = this.state
    let infoText = ''
    const cellNodes = []

    switch (winner) {
      case BLACK:
        infoText = 'Black Wins'
        break
      case WHITE:
        infoText = 'White Wins'
        break
      case DEATH:
        infoText = 'Dead Game'
        break
      default:
        infoText = `vs ${Game.ai.name} (AI)`
        break
    }

    const enabled = winner !== BLACK && winner !== WHITE

    for (let i = 0; i < ROWS; i += 1) {
      for (let j = 0; j < COLS; j += 1) {
        cellNodes.push(
          <Cell
            key={i * ROWS + j}
            onClick={() => {
              if (enabled) {
                this.handleClick(i, j)
              }
            }}
            row={i}
            col={j}
            rows={ROWS}
            cols={COLS}
            val={board[i][j]}
          />
        )
      }
    }

    return (
      <div className="gobang">
        <div className="board">
          <div className="cells">{cellNodes}</div>
          <Grid rows={ROWS} cols={COLS} />
        </div>

        <div className="info">
          <button
            type="button"
            className={`info__button ${enabled ? '' : 'info__button--wins'}`}
            onClick={() => {
              this.reset()
            }}
          >
            <strong>{infoText}</strong>
            <br />
            <br />
            (Click to reset)
          </button>
          <button
            type="button"
            className="info__button"
            onClick={() => {
              this.changeMode()
            }}
          >
            <strong>{`${Game.ai.mode} mode`}</strong>
            <br />
            <br />
            (Click to change AI mode)
          </button>
        </div>
      </div>
    )
  }
}

export default GoBang
