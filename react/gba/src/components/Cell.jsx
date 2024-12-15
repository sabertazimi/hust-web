import { BLACK, CELL_SIZE, WHITE } from '../constants'

import './Cell.scss'

function Cell(props) {
  const { row, col, val } = props

  const styles = {
    width: CELL_SIZE,
    height: CELL_SIZE,
    top: row * CELL_SIZE,
    left: col * CELL_SIZE,
  }

  let innerClass = ''

  switch (val) {
    case BLACK:
      innerClass = 'black'
      break
    case WHITE:
      innerClass = 'white'
      break
    default:
      innerClass = ''
      break
  }

  return (
    <div {...props} className="cell" style={styles}>
      <div className={innerClass} />
    </div>
  )
}

export default Cell
