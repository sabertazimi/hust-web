import { scheduleUpdate } from './reconciler.js'

class Component {
  constructor(props) {
    this.props = props || {}
    this.state = this.state || {}
  }

  setState(partialState) {
    scheduleUpdate(this, partialState)
  }
}

function createInstance(fiber) {
  // eslint-disable-next-line new-cap
  const instance = new fiber.type(fiber.props)
  instance.__fiber = fiber
  return instance
}

export { Component, createInstance }
