const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { userDao } = require('../dao');
const { passwordService } = require('../services');

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

      if (!passwordService.valid(user, password)) {
        return done(null, false, {
          message: 'Password is wrong'
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
