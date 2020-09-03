const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const nextConfig = require('./next.config');

app.prepare()
.then(() => {
  const server = express();

  server.get(`${nextConfig.assetPrefix}/p/:id`, (req, res) => {
    const actualPage = '/post';
    const queryParams = { id: req.params.id};
    app.render(req, res, actualPage, queryParams);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) {
      throw err;
    }

    console.log('> Ready on http://localhost:3000');
  });
})
.catch((err) => {
  console.error(err.stack);
  process.exit(-1);
});
