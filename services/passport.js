const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../config/keys');

// requireing User this way to avoid testing errors and collisions
const User = mongoose.model('users');
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// TODO: add GitHub and Facebook Auth Strategies
// TODO: set up cache
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/cb'
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id });

      if (existingUser) {
        console.log('returning existing user: ', existingUser);
        // return existing user from DB
        return done(null, existingUser);
      }

      // create a new user record if not found in db
      const newUser = await new User({ googleID: profile.id }).save();
      console.log('newUser returned: ', newUser);
      done(null, newUser);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: '/auth/facebook/cb'
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ facebookID: profile.id });
      console.log('profile', profile.id);
      if (existingUser) {
        console.log('returning existing user: ', existingUser);
        // we already have a record with the given profile ID
        return done(null, existingUser);
      }

      // we don't have a user record with this ID, make a new record!
      const newUser = await new User({ facebookID: profile.id }).save();
      console.log('newUser returned', newUser);
      done(null, newUser);
    }
  )
);
