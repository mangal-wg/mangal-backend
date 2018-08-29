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
