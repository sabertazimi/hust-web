const http = require('http');
const EventEmitter = require('events');
const contextProxy = require('./context');
const requestProxy = require('./request');
const responseProxy = require('./response');

class Koa extends EventEmitter {
  constructor() {
    super();
  }

  use(fn) {
    this.fn = fn;
  }

  createContext(req, res) {
    const ctx = Object.create(contextProxy);
    const request = ctx.request = Object.create(requestProxy);
    const response = ctx.response = Object.create(responseProxy);

    // change resquest/response.req/res in request.js/response.js
    // proxy ctx.XX with req/res.XX;
    // request/response.req/res.XX => req/res.XX ==Proxy=> ctx.XX
    ctx.req = request.req = response.req = req;
    ctx.res = request.res = response.res = res;
    request.ctx = response.ctx = ctx;

    request.response = response;
    response.request = request;

    return ctx;
  }

  handleRequest(req, res) {
    const ctx = this.createContext(req, res);
    this.fn(ctx); // api to Koa users
    res.end(ctx.body);
  }

  listen(...args) {
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args);
  }
}

module.exports = Koa;
