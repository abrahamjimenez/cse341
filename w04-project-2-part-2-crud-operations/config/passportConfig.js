const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const Dog = require('../models/dogModel');
const Horse = require('../models/horseModel');

passport.use(new BearerStrategy(
  function (token, done) {
    Dog.findOne({token: token}, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      return done(null, user, {scope: 'all'});
    });
  }
));
