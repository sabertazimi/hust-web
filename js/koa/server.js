const Koa = require('./lib');
const app = new Koa();

app.use((ctx) => {
  ctx.body = 'Hello Koa';
});

app.listen(2323, () => {
  console.log('Koa server are listening to http://localhost:2323 ...');
});
