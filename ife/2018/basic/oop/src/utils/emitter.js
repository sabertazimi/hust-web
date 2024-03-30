export default class Emitter {
  constructor() {
    this.channels = {
      default: [],
    }
  }

  /**
   * @param {*} channel
   * @param {*} receiver
   * @returns unsubscribe index for receiver
   * @memberof Emitter
   */
  on(channel, receiver) {
    // create new channel
    if (!this.channels[channel])
      this.channels[channel] = []

    this.channels[channel].push(receiver)
    return this.channels[channel].indexOf(receiver)
  }

  off(channel, index) {
    this.channels[channel].splice(index, 1)
  }

  emit(channel, message) {
    if (!this.channels[channel])
      return

    this.channels[channel].forEach(receiver => receiver(message))
  }
}
