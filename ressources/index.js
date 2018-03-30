var epilogue = require('epilogue');
var db = require('../models');
var middlewares = require('./middlewares')

// Init Epilogue
var initialize = function(app) {
  epilogue.initialize({
    app: app,
    sequelize: db.sequelize
  });

  // Create REST resources
  var attributeResource = epilogue.resource({
    model: db.attribute,
    endpoints: ['/api/v0/attribute', '/api/v0/attribute/:id']
  });

  var refResource = epilogue.resource({
    model: db.ref,
    endpoints: ['/api/v0/ref', '/api/v0/ref/:id']
  });

  var userResource = epilogue.resource({
    model: db.user,
    endpoints: ['/api/v0/users', '/api/v0/user/:id']
  });

  var traitResource = epilogue.resource({
    model: db.trait,
    endpoints: ['/api/v0/trait', '/api/v0/trait/:id']
  });

  var environmentResource = epilogue.resource({
    model: db.environment,
    endpoints: ['/api/v0/environment', '/api/v0/environment/:id']
  });

  var taxonResource = epilogue.resource({
    model: db.taxon,
    endpoints: ['/api/v0/taxa', '/api/v0/taxa/:id']
  });

  var datasetResource = epilogue.resource({
    model: db.dataset,
    endpoints: ['/api/v0/dataset', '/api/v0/dataset/:id']
  });

  var networkResource = epilogue.resource({
    model: db.network,
    endpoints: ['/api/v0/network', '/api/v0/network/:id']
  });

  var interactionResource = epilogue.resource({
    model: db.interaction,
    endpoints: ['/api/v0/interaction', '/api/v0/interaction/:id']
  });

  var taxaBackResource = epilogue.resource({
    model: db.taxo_back,
    endpoints: ['/api/v0/taxa_back', '/api/v0/taxa_back/:id']
  });

  // Protections ressources with middlewares
  attributeResource.use(middlewares);
  refResource.use(middlewares);
  userResource.use(middlewares);
  traitResource.use(middlewares);
  environmentResource.use(middlewares);
  taxonResource.use(middlewares);
  datasetResource.use(middlewares);
  networkResource.use(middlewares);
  interactionResource.use(middlewares);
  taxaBackResource.use(middlewares);

};

module.exports = {
  initialize: initialize
};
