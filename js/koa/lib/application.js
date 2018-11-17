const http = require('http');
const Stream = require('stream');
const EventEmitter = require('events');

const contextProxy = require('./context');
const requestProxy = require('./request');
const responseProxy = require('./response');

class Koa extends EventEmitter {
  constructor() {
    super();
    this.middlewares = [];
  }

  use(fn) {
    this.middlewares.push(fn);
  }
  
  compose(middlewares, ctx) {
    const dispatch = (index) => {
      if (index === middlewares.length) {
        return;
      }

      // `next` function: call next middleware recursively
      const next = () => dispatch(index + 1);

      // call current middleware
      const middleware = middlewares[index];
      middleware(ctx, next);
    };

    dispatch(0);
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
    // when ctx.body dosen't change, statusCode contains '404'
    res.statusCode = 404;

    // create context proxy for `req` and `res` operations
    const ctx = this.createContext(req, res);

    // middleware (open api for Koa users)
    this.compose(this.middlewares, ctx);

    if (typeof ctx.body === 'object' && ctx.body !== null) {
      res.setHeader('Content-Type', 'application/json;charset=utf8');
      res.end(JSON.stringify(ctx.body));
    } else if (ctx.body instanceof Stream) {
      ctx.body.pipe(res);
    } else if (typeof ctx.body === 'string' || Buffer.isBuffer(ctx.body)) {
      res.setHeader('Content-Type', 'text/htmlcharset=utf8');
      res.end(ctx.body);
    } else {
      res.end('Not Found');
    }
  }

  listen(...args) {
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args);
  }
}

module.exports = Koa;
