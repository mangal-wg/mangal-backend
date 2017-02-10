// List module dependancies
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var http = require('http');
var passport = require('passport');
var db = require('./models');

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


// Init Databases
if (process.env.NODE_ENV == 'development') {

    // test authentification
    db.sequelize
        .authenticate()
        .then(function(success) {
            console.log('Connection has been established successfully.');
        })
        .catch(function(err) {
            console.log('Unable to connect to the database:', err);
        });

    // sync DB
    db.sequelize.sync({
        force: true
    });

};

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
