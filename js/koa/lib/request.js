const url = require('url');

const request = {
  get url() {
    // req.url => this.req.url => ctx.request.url => ctx.url
    return this.req.url;
  },
  get path() {
    return url.parse(this.req.url).pathname;
  },
  get query() {
    return url.parse(this.req.url).query;
  }
};

module.exports = request;
