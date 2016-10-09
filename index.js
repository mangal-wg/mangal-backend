// List module dependancies
var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models');
var http = require('http');
var orcidConf = require('./config/orcid');
var passport = require('passport')
var OAuth2Strategy = require('passport-oauth2').Strategy
var epilogue = require('epilogue')

// Init express app
var app = express();
app.set('view engine', 'pug')
app.set('views', __dirname + '/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


// Set Authentification Strategy
// configure oauth2 strategy for orcid use
const oauth2 = new OAuth2Strategy(orcidConf,
    function(req, accessToken, refreshToken, params, profile, cb) {
      db.user.findOrCreate({where: {
          name: params.name,
          orcid: params.orcid
        }}).spread(function(user, created) {
          profile.name = user.get('name');
          profile.orcid = user.get('orcid');
          return cb(null,profile)
        });
});

app.use(passport.initialize());
passport.use(oauth2);

// Init ressources
epilogue.initialize({
    app: app,
    sequelize: db.sequelize
});

// Create REST resources
var taxonResource = epilogue.resource({
    model: db.taxon,
    endpoints: ['/api/v0/taxon', '/api/v0/taxon/:id']
});

taxonResource.all.auth(function(req, res, context) {
    console.log(req.isAuthenticated());
});

app.get('/auth', passport.authenticate('oauth2',{ session:false })); // empty route handler function, it won't be triggered
app.get('/auth/callback', passport.authenticate('oauth2', {
    successRedirect: '/',
    failureRedirect: '/login',
    session:false
})); // route handler

// Start DB
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

// start server
var port = process.env.PORT || 3000;
server = http.createServer(app);
server.listen(port);

module.exports = server;
