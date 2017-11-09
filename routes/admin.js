var express = require('express');
const session = require('express-session');
var router = express.Router();

router.get('/:username', (req, res) => {
    const username = req.params.username;
    if (req.session.role === 'admin') {
        res.render('admin', {
            title: 'Admin',
            username: username
        });
    } else {
        res.send('Access denied...');
    }
});

module.exports = router;
