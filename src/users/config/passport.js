const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { userDao } = require('../dao');

function localStrategyBehavior(username, password, done) {
  userDao
    .getOne({
      username
    })
    .then((user) => {
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }

      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }

      return done(null, user);
    })
    .catch(err => done(err));
}

const localStrategy = new LocalStrategy({
  usernameField: 'username'
}, localStrategyBehavior);

passport.use(localStrategy);
