import passport from 'passport';
import { userDao } from '../dao';
import User from '../models/user';
import { jwtService, passwordService } from '../services';

class AuthenticationController {
  register = (request, response) => {
    const user = new User();
    const { username, password } = request.body;
    user.username = username;
    user.password = password;

    userDao
      .create(user)
      .then(() => {
        response.status(200).json({
          auth: true,
          id: user._id,
          token: jwtService.generateJwt(user)
        });
      })
      .catch(() => {
        response
          .status(400)
          .json({ auth: false, message: 'User already exist' });
      });
  };

  login = (request, response) =>
    passport.authenticate('local', (error, user, info) => {
      if (error) {
        response.status(404).json({ auth: false, message: error.message });
      } else if (user) {
        response.status(200).json({
          auth: true,
          id: user._id,
          token: jwtService.generateJwt(user)
        });
      } else {
        response.status(401).json({ auth: false, message: info });
      }
    })(request, response);

  changePassword = (request, response) => {
    if (request.user) {
      userDao
        .getById(request.user.id)
        .then(user =>
          passwordService.change(
            user,
            request.body.password,
            request.body.newPassword
          )
        )
        .then(user => userDao.updateById(request.user.id, user))
        .then(user =>
          response
            .status(200)
            .json({ auth: true, token: jwtService.generateJwt(user) })
        )
        .catch(error => response.status(400).json({ message: error.message }));
    } else {
      throw new Error(
        'User not found. Maybe you skipped or forgot do token verification'
      );
    }
  };
}

export default new AuthenticationController();
