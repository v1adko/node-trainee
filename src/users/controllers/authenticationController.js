import passport from 'passport';
import { userDao } from '../dao';
import User from '../models/user';
import { jwtService, passwordService } from '../services';

class AuthenticationController {
  register = (req, res) => {
    const user = new User();
    user.setFields({ username: req.body.username, password: req.body.password });

    userDao.create(user)
      .then(() => {
        res.status(200).json({ auth: true, id: user._id, token: jwtService.generateJwt(user) });
      })
      .catch(() => { res.status(400).json({ auth: false, message: 'User already exist' }); });
  }

  login = (req, res) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        res.status(404).json({ auth: false, message: err.message });
      } else if (user) {
        res.status(200).json({ auth: true, id: user._id, token: jwtService.generateJwt(user) });
      } else {
        res.status(401).json({ auth: false, message: info });
      }
    })(req, res);
  }

  changePassword = (req, res) => {
    if (req.user) {
      userDao.getById(req.user.id)
        .then(user => passwordService.change(user, req.body.password, req.body.newPassword))
        .then(user => userDao.updateById(req.user.id, user))
        .then(user => res.status(200).json({ auth: true, token: jwtService.generateJwt(user) }))
        .catch(err => res.status(400).json({ message: err.message }));
    } else { throw new Error('User not found. Maybe you skipped or forgot do token verification'); }
  }
}

export default new AuthenticationController();
