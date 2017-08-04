// List module dependancies
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var db = require('./models');
var passport = require('passport');

// Init express app
var app = express();


// Init all dependencies used by the app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// test authentification
db.sequelize
    .authenticate()
    .then(function(success) {
        console.log('Connection has been established successfully.');
    })
    .catch(function(err) {
        console.log('Unable to connect to the database:', err);
    });

// Init Databases
if (process.env.NODE_ENV == 'development') {

    // sync DB - WARNING at each npm start dbs are dropped and re-created
    db.sequelize.sync({});

};

// Init REST ressources
require('./ressources').initialize(app);


// test BearerStrategy
require('./ressources/oauth.js')(passport);

// app.get('/profile',
//   passport.authenticate('bearer', { session: false }),
//   function(req, res) {
//     if(typeof req.user === 'undefined'){
//       res.status(204).send('No user profile');
//     } else {
//       res.status(200).json(req.user);
//     };
//   });

// start server
var port = process.env.PORT_MANGAL_API || 3000;
server = http.createServer(app);
server.listen(port);

module.exports = server;
