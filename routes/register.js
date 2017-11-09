const express = require('express');
const session = require('express-session');
var router = express.Router();

const waiterModel = require('../models/waiter.registration.model');

router.get('/', (req, res) => {
    if (req.session.role === 'waiter') {
        res.redirect('/user/' + req.session.username);
    } else if (req.session.role === 'admin') {
        res.redirect('/admin/' + req.session.username);
    } else {
        res.render('register', {
            title: 'Register'
        });
    }
});

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    waiterModel
        .findOne({
            username: username
        })
        .then( (waiter) => {
            if (waiter) {
                req.flash('error', 'Waiter already exist');
                res.redirect('/register');
            } else {
                waiterModel
                .create({
                    username: username,
                    password: password
                })
                req.flash('success', 'Registration successful');
                res.redirect('/register');
            }
        })
});

module.exports = router;
