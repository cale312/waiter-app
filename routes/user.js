const express = require('express');
const session = require('express-session');
var router = express.Router();

router.get('/:username', (req, res) => {
    const username = req.params.username;
    if (req.session.role === 'waiter') {
        res.render('user', {
            username: username,
            title: 'Waiter'
        });
    } else {
        res.send('Access denied...');
    }
});

router.post('/:username', (req, res) => {
    
});

module.exports = router;
