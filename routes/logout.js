const express = require('express');
const session = require('express-session');
var router = express.Router();

router.get('/', (req, res) => {
    delete req.session.username;
    delete req.session.role;
    res.redirect('/login');
});

module.exports = router;
