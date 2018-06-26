const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

// requireing User this way to avoid testing errors and collisions
const User = mongoose.model('users');
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id).then(user => {
//     done(null, user);
//   });
// });

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
      // const existingUser = await User.findOne({ googleID: profile.id });

      // if (existingUser) {
      //   // return existing User from DB
      //   return done(null, existingUser);
      // }
      console.log(`profile: `, profile.id);
      // create a new user record if not found in db
      console.log('user: ', User);
      new User({ googleID: profile.id }).save();
      // done(null, user);
    }
  )
);
