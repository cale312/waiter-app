var express = require('express');
const session = require('express-session');
var router = express.Router();

router.get('/', (req, res) => {
    const username = req.params.username;
    res.render('admin', {
        title: 'Admin',
        username: req.session.username
    });
});

module.exports = router;
