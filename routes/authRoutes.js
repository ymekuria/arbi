const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/cb', passport.authenticate('google'));

  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/cb', passport.authenticate('facebook'));

  app.get('/api/logout', (req, res) => {
    // method provided by passport
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
