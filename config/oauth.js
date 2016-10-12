module.exports = config = {
  // Config for Orcid
  authorizationURL: 'https://sandbox.orcid.org/oauth/authorize',
  clientID: 'APP-O9TUKAPVLALU1SOJ',
  clientSecret: '0eafb938-020e-45a6-a148-3c222171d9d8',
  tokenURL: 'https://api.sandbox.orcid.org/oauth/token',
  callbackURL: 'http://localhost:3000/auth/callback',
  scope: '/authenticate',
  passReqToCallback: true
};
