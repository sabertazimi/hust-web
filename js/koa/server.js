const Koa = require('./lib');
const app = new Koa();

app.use(async (ctx, next) => {
  console.log(1);
  await next();
  console.log(2);
});

app.use(async (ctx, next) => {
  console.log(3);

  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('3.5');
      resolve();
    }, 1000);
  });

  await p.then();
  await next();
  console.log(4);
  ctx.body = 'Hello Koa';
});

app.listen(2323, () => {
  console.log('Koa server are listening to http://localhost:2323 ...');
});
