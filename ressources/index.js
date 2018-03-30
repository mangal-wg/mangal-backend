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
    endpoints: ['/api/v2/attribute', '/api/v2/attribute/:id']
  });

  var refResource = epilogue.resource({
    model: db.ref,
    endpoints: ['/api/v2/ref', '/api/v2/ref/:id']
  });

  var userResource = epilogue.resource({
    model: db.user,
    endpoints: ['/api/v2/users', '/api/v2/user/:id']
  });

  var traitResource = epilogue.resource({
    model: db.trait,
    endpoints: ['/api/v2/trait', '/api/v2/trait/:id']
  });

  var environmentResource = epilogue.resource({
    model: db.environment,
    endpoints: ['/api/v2/environment', '/api/v2/environment/:id']
  });

  var taxonResource = epilogue.resource({
    model: db.taxon,
    endpoints: ['/api/v2/taxa', '/api/v2/taxa/:id']
  });

  var datasetResource = epilogue.resource({
    model: db.dataset,
    endpoints: ['/api/v2/dataset', '/api/v2/dataset/:id']
  });

  var networkResource = epilogue.resource({
    model: db.network,
    endpoints: ['/api/v2/network', '/api/v2/network/:id']
  });

  var interactionResource = epilogue.resource({
    model: db.interaction,
    endpoints: ['/api/v2/interaction', '/api/v2/interaction/:id']
  });

  var taxaBackResource = epilogue.resource({
    model: db.taxo_back,
    endpoints: ['/api/v2/taxa_back', '/api/v2/taxa_back/:id']
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
