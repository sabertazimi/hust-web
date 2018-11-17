const http = require('http');
const EventEmitter = require('event');
const context = require('./context');
const request = require('./request');
const response = require('./response');

class Koa extends EventEmitter {
  constructor() {
    super();
  }

  use() {

  }

  listen() {

  }
}

module.exports = Koa;
