const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});
