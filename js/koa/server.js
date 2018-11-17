const Koa = require('./lib');
const app = new Koa();

app.use((ctx, next) => {
  ctx.body = '1';
  next()
  ctx.body += '2';
});

app.use((ctx, next) => {
  ctx.body += '3';
  next()
  ctx.body += '4';
});

app.use((ctx, next) => {
  ctx.body += '5';
  next();
  ctx.body += '6';
});

app.listen(2323, () => {
  console.log('Koa server are listening to http://localhost:2323 ...');
});
