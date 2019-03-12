var passport = require('passport');
require('./oauth.js')(passport);

module.exports = {
  delete: {
    auth: function(req, res, context) {
      passport.authenticate('bearer', {
          session: false
      })(req, res, function() { // this is the function called after auth
          if(req.user){
            context.continue();
          } else {
            context.stop();
          }
      });
    }
  },
  list: {
    fetch: {
      before: function (req, res, context) {
        context.options = context.options || {};
        context.options.distinct = true;
        return context.continue;
      }
    }
  },
  create: {
    auth: function(req, res, context) {
      passport.authenticate('bearer', {
          session: false
      })(req, res, function() { // this is the function called after auth
          if(req.user){
            context.continue();
          } else {
            context.stop();
          }
      });
    }
  }
};
// SCOPE VS context.criteria();
