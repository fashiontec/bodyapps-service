/*
 * Copyright (c) 2014, Fashiontec (http://fashiontec.org)
 * Licensed under LGPL, Version 3
 */

/*
 * Configure operations for passport. It serialize and deserialize user from the session. Also 
 * defines our Google authentication strategy.
 */

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var passport = require('passport');

var User = require('./models/user');
var config = require('./config');

passport.authCheck = function(gmail, profile, done) {

  User.findOne({ email: gmail}, function(err, gUser) {
    if (err) return done(err);

    if (gUser) {
      return done(null, gUser);
    } 

    // Set all relevant information and save user
    var newUser = new User();
    newUser.name  = profile.displayName;
    newUser.email = profile.emails[0].value;
    newUser.save(function(err) {
      if (err) return done(err);
      return done(null, newUser);
    });
  });
}

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    if (!err) done(null, user);
    else done(err, null)
  });
});

passport.use(new GoogleStrategy({
    clientID: config.google_oauth.client_id,
    clientSecret: config.google_oauth.client_secret,
    callbackURL: '/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      var gmail = profile.emails[0].value;
      return passport.authCheck(gmail, profile, done);
    });
  }
));

module.exports = passport;
