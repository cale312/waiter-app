const express = require('express');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const path = require('path');

const app = express();

// Router files
const login = require('./routes/login');
const register = require('./routes/register');
const user = require('./routes/user');
const admin = require('./routes/admin');
const logout = require('./routes/logout');

// Connection Config file
const connect = require('./config/connection');

connect();

// flash messages set =up
app.use(flash());
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30 }, resave: true, saveUninitialized: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

isLoggedIn = (req, res, next) => {
    if (!req.session.username) {
        req.flash('error', 'You are not logged in');
        return res.redirect('/login');
    }
    next();
}

isAdmin = (req, res, next) => {
    if (req.session.role === 'waiter') {
        return res.send('Access denied...');
    }
    next();
}

isWaiter = (req, res, next) => {
    if (req.session.role === 'admin') {
        return res.send('Access denied...');
    }
    next();
}

app.use('/', login);
app.use('/login', login);
app.use('/register', register);
app.use('/user', isLoggedIn, isWaiter, user);
app.use('/admin', isLoggedIn, isAdmin, admin);
app.use('/logout', logout);

const port = process.env.PORT || 7000;
app.listen(port, (err) => {
    (err) ? console.error(err) : console.log('lisitening on https://locahost:' + port);
})
