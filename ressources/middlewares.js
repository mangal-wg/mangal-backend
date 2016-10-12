module.exports = {
    all: {
        auth: function(req, res, context) {
            if (req.isAuthenticated()) {
                return context.continue();
            } else {
                return context.error(401, 'Unauthorized access', 'Please login at /auth');
            }
        }
    }
};
