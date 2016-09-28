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
  .then(function(success) {
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

// Create REST resources
var taxonResource = epilogue.resource({
  model: db.taxon,
  endpoints: ['taxon','taxon/:id'].map(function(x){return(baseapiurl+x)});
});

var datasetResource = epilogue.resource({
  model: db.dataset,
  endpoints: ['dataset','dataset/:id'].map(function(x){return(baseapiurl+x)});
});

var interactionResource = epilogue.resource({
  model: db.interaction,
  endpoints: ['interaction','interaction/:id'].map(function(x){return(baseapiurl+x)});
});

var itemResource = epilogue.resource({
  model: db.item,
  endpoints: ['item','item/:id'].map(function(x){return(baseapiurl+x)});
});

var networkResource = epilogue.resource({
  model: db.network,
  endpoints: ['network','network/:id'].map(function(x){return(baseapiurl+x)});
});

// Sync database with new models
db.sequelize.sync({force:true});

// start server
var port = process.env.PORT || 3000;
server = http.createServer(app);
server.listen(port);
