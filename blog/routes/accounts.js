var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js');
    passport = require('passport');

router.get('/', function (req, res) {
    return res.send('This is accounts interface.');
});

router.route('/signup')
    .get(function (req, res) {
        res.render('signup.hbs', { title: 'Sign Up'});
    })
    .post(function (req, res, next) {
        var username = req.body.username || '',
            password = req.body.password || '';

        if (username.length === 0 || password.length === 0) {
            // return 直接结束中间件
            return res.status(400).end('Invalid User name or password');
        }

        var userNameExist = false;

        if (userNameExist) {
            // return 直接结束中间件
            return res.status(400).end('User name existed');
        }

        User.register(new User({
                username: username
            }), req.body.password, function (err) {
            if (err) return next(err);
            res.status(201).end(username + ' Sign Up Success');
        });
    });

router.route('/signin')
    .get(function (req, res) {
        res.render('signin.hbs', { title: 'Sabertazim\' Blog' });
    })
    .post(passport.authenticate('local'), function(req, res) {
        // 如果进入了该方法，则已经验证成功。
        // 我们可以重定向到首页：
        res.redirect('/');
        // 或者发送成功的响应：
        // res.status(200).end();)
    });

module.exports = router;
