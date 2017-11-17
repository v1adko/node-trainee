import passport from 'passport';
import userDao from '../dao';
import User from '../models/user';
import { passwordService } from '../services';
import jwtService from '../../services/jwtService';
import permissions from '../../config/permissions';

class AuthenticationController {
  register = async (request, response) => {
    const user = new User();
    const { username, password } = request.body;
    user.username = username;
    user.password = password;

    try {
      await userDao.create(user);
      response.status(200).json({
        auth: true,
        id: user._id,
        token: jwtService.generateJwt(user, permissions.USER)
      });
    } catch (error) {
      response.status(400);
      if (error.code === 11000) {
        response.json({ auth: false, message: 'User already exist' });
      } else {
        response.json({ auth: false, message: error.message });
      }
    }
  };

  login = (request, response) =>
    passport.authenticate('local', (error, user, info) => {
      if (error) {
        response.status(404).json({ auth: false, message: error.message });
      } else if (user) {
        response.status(200).json({
          auth: true,
          id: user._id,
          token: jwtService.generateJwt(user, permissions.USER)
        });
      } else {
        response.status(401).json({ auth: false, message: info });
      }
    })(request, response);

  changePassword = async (request, response) => {
    // should be move!!!
    if (request.user) {
      const { password, newPassword } = request.body;

      try {
        let user = await userDao.getById(request.user.id);
        user = await passwordService.change(user, password, newPassword);
        user = await userDao.updateById(request.user.id, user);

        response
          .status(200)
          .json({
            auth: true,
            token: jwtService.generateJwt(user, permissions.USER)
          });
      } catch (error) {
        response.status(400).json({ message: error.message });
      }
    } else {
      throw new Error(
        'User not found. Maybe you skipped or forgot do token verification'
      );
    }
  };
}

export default new AuthenticationController();
