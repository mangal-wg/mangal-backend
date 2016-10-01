// List module dependancies
var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models');
var http = require('http');
var config = require('./config/orcid');
var querystring = require('querystring');
var request = require('request');

// Init express app
var app = express();
app.set('view engine', 'pug')
app.set('views', __dirname + '/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// start server
var port = process.env.PORT || 3000;
server = http.createServer(app);
server.listen(port);

app.get('/auth', function(req, res) { // Redeem code URL

    var auth_link = config.AUTHORIZE_URI + '?' +
        querystring.stringify({
            'redirect_uri': config.CODE_CALLBACK_URI,
            'scope': '/authenticate /activities/update',
            'response_type': 'code',
            'client_id': config.CLIENT_ID
        });

    return res.redirect(auth_link);

});

app.get('/auth/callback', function(req, res) {

  if (req.query.error == 'access_denied') {
    // User denied access
    res.status(400);
    res.send('App access denied by user');

  } else {

    var exchangingReq = {
        url: config.TOKEN_EXCHANGE_URI,
        method: 'post',
        body: querystring.stringify({
            'code': req.query.code,
            'client_id': config.CLIENT_ID,
            'client_secret': config.CLIENT_SECRET,
            'grant_type': 'authorization_code',
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
        }
    }

    var exchangingCallback = function(error,response) {
      if(response){
        res.status(200);
        res.send('User access granted');
      } else if (error) {
        res.status(400);
        res.send('User access denied');
      }
    };

    return request(exchangingReq, exchangingCallback);
  }
});


// Init ressources
var api = require('./ressources').initialize(app);

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

module.exports = server;
