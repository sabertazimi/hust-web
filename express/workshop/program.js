var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    body = require('body-parser'),
    app = express(),
    publicPath = process.argv[3] || path.join(__dirname, 'public');

app.use(body.urlencoded({extended: false}));

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'jade');

app.use(require('stylus').middleware(publicPath));
app.use(express.static(publicPath));

app.get('/home', function (req, res) {
    // res.end('Hello World!');
    res.render('index', { date: new Date().toDateString() });
});

app.get('/search', function (req, res) {
    res.send(req.query);
});

app.get('/books', function (req, res) {
    res.json(JSON.parse(fs.readFileSync(publicPath)));
});

app.post('/form', function (req, res) {
    res.end(req.body.str.split('').reverse().join(''));
});

app.put('/message/:id', function (req, res) {
    res.end(require('crypto')
            .createHash('sha1')
            .update(new Date().toDateString() + req.params.id)
            .digest('hex')
            );
});

app.listen(process.argv[2]);
