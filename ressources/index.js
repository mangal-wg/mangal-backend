var epilogue   = require('epilogue');
var db = require('../models');
var middlewares = require('./middlewares')

// Init Epilogue
var initialize = function(app) {
  epilogue.initialize({
    app: app,
    sequelize: db.sequelize
  });

  // Create REST resources
  var taxonResource = epilogue.resource({
    model: db.taxon,
    endpoints: ['/api/v0/taxon','/api/v0/taxon/:id']
  });

  var datasetResource = epilogue.resource({
    model: db.dataset,
    endpoints: ['/api/v0/dataset','/api/v0/dataset/:id']
  });

  var interactionResource = epilogue.resource({
    model: db.interaction,
    endpoints: ['/api/v0/interaction','/api/v0/interaction/:id']
  });

  var networkResource = epilogue.resource({
    model: db.network,
    endpoints: ['/api/v0/network','/api/v0/network/:id']
  });


  // Temporarly desactivate oauth middlewares
  // taxonResource.use(middlewares);
  // datasetResource.use(middlewares);
  // interactionResource.use(middlewares);
  // networkResource.use(middlewares);

};

module.exports = {
  initialize: initialize
};
