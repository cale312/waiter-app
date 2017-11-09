var express = require('express');
const session = require('express-session');
var router = express.Router();

const waiterModel = require('../models/waiter.registration.model');

router.get('/', (req, res) => {
    if (req.session.role === 'waiter') {
        res.redirect('/user/' + req.session.username)
    } else if (req.session.role === 'admin') {
        res.redirect('/admin');
    } else {
        res.render('login', {
            title: 'Login'
        })
    }
});

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    req.session.username = req.body.username;

    if (username === 'admin') {
        req.session.role = 'admin';
        res.redirect('/admin')
    } else {
        req.session.role = 'waiter';
        res.redirect('/user/' + username);
    }

});

module.exports = router;
