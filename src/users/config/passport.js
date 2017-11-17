import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import userDao from '../dao';
import { passwordService } from '../services';

async function localStrategyBehavior(username, password, done) {
  try {
    const user = await userDao.getOne({ username });

    if (!user) {
      return done(null, false, 'User not found');
    }

    if (!passwordService.valid(user, password)) {
      return done(null, false, 'Password is wrong');
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}

const localStrategy = new LocalStrategy(
  {
    usernameField: 'username'
  },
  localStrategyBehavior
);

passport.use(localStrategy);
