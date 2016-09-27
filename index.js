// List module dependancies
var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models');
var http = require('http');
var epilogue = require('epilogue');

// Init express app
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// test login authentification
db.sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

// Init Epilogue
epilogue.initialize({
  app: app,
  sequelize: db.sequelize
});

var baseapiurl = '/api/v0/'

// Create REST resource
var taxaResource = epilogue.resource({
  model: db.taxa,
  endpoints: ['/api/v0/taxa','/api/v0/taxa/:id']
});

// Sync database with new models
db.sequelize.sync({force:true});

// start server
var port = process.env.PORT || 3000;
server = http.createServer(app);
server.listen(port);
