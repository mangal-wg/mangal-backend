// List module dependancies
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var http = require('http');
var passport = require('passport')

// Init express app
var app = express();

// Config on express-session
app.use(session({
    secret: 'keyboard cat', // Set in ENV in production
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}))

// Init all dependencies used by the app
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Init REST ressources
require('./ressources').initialize(app);

// Init oauth middleware
require('./oauth')(passport);

// Basic oauth routes set in orcid URI callback
app.get('/auth', passport.authenticate('oauth2'));
app.get('/auth/callback', passport.authenticate('oauth2', {
    successRedirect: '/success',
    failureRedirect: '/login'
}));

// start server
var port = process.env.PORT || 3000;
server = http.createServer(app);
server.listen(port);

module.exports = server;
