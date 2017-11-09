const express = require('express');
const session = require('express-session');
var router = express.Router();

router.get('/:username', (req, res) => {
    const username = req.params.username;
    res.render('user', {
        username: username,
        title: 'Waiter'
    });
});

router.post('/:username', (req, res) => {
    
});

module.exports = router;
