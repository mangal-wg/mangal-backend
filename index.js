// List module dependancies
var express = require('express');
var session = require('express-session');
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

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Set Authentification Strategy
// configure oauth2 strategy for orcid use
const oauth2 = new OAuth2Strategy(orcidConf,
    function(req, accessToken, refreshToken, params, profile, cb) {
        db.user.findOrCreate({
            where: {
                name: params.name,
                orcid: params.orcid
            }
        }).spread(function(user) {
            profile.name = user.get('name');
            profile.orcid = user.get('orcid');
            profile.id = user.get('id');
            return cb(null, profile)
        });
    });

app.use(passport.initialize());
passport.use(oauth2);

// serialize & deserialize create information for the session that references a user in the database
passport.serializeUser(function(user, cb) { // id store in cookie
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) { // retrieve id from cookie and perform id request on user table
    db.user.findById(id).then(function(profile) {
            var user = profile.get({
                plain: true
            }); 
            cb(null, user);
    });
});

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
       if(req.isAuthenticated()){
              context.continue();
       } else {
              context.error(401, 'Unauthorized access','Please login at /auth');
       }
});


app.get('/auth', passport.authenticate('oauth2')); // empty route handler function, it won't be triggered
app.get('/auth/callback', passport.authenticate('oauth2', {
    successRedirect: '/success',
    failureRedirect: '/login'
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