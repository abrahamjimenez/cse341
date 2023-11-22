const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const Dog = require('../models/dogModel');
const Horse = require('../models/horseModel');

passport.use(new BearerStrategy(
  function (token, done) {
    Dog.findOne({ token: token })
      .then(user => {
        if (!user) {
          return done(null, false);
        }
        return done(null, user, { scope: 'all' });
      })
      .catch(err => done(err));
  }
));
