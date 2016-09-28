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

function endpointize(endpoints, baseurl) {
    return endpoints.map(
        function(e){
            return(baseurl+e)
        }
    )
}

// Create REST resources
var taxonResource = epilogue.resource({
  model: db.taxon,
  endpoints: endpointize(['taxon','taxon/:id'])
});

var datasetResource = epilogue.resource({
  model: db.dataset,
  endpoints: endpointize(['dataset','dataset/:id'])
});

var interactionResource = epilogue.resource({
  model: db.interaction,
  endpoints: endpointize(['interaction','interaction/:id'])
});

var itemResource = epilogue.resource({
  model: db.item,
  endpoints: endpointize(['item','item/:id'])
});

var networkResource = epilogue.resource({
  model: db.network,
  endpoints: endpointize(['network','network/:id'])
});

// Sync database with new models
db.sequelize.sync({force:true});

// start server
var port = process.env.PORT || 3000;
server = http.createServer(app);
server.listen(port);
