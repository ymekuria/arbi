const passport = require('passport');
const GoogleStrategy = require('passpo rt-google-oauth20').Strategy;
const keys = require('../config/keys');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// TODO: add GitHub and Facebook Auth Strategies

passport.use(
  new GoogleStrategy({
    clientID: keys.clientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: 'auth/google/cb',
    proxy: true
  })
);
