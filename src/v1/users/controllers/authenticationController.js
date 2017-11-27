import passport from 'passport';
import userDao from '../dao';
import User from '../models/user';
import jwtService from '../../../services/jwtService';

class AuthenticationController {
  constructor(DAO, authPassport) {
    this.DAO = DAO;
    this.passport = authPassport;

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(request, response) {
    const user = new User();
    const { username, password } = request.body;
    user.username = username;
    user.password = password;

    try {
      await this.DAO.create(user);
      response.status(200).json({
        auth: true,
        id: user.id,
        token: jwtService.generateJwt(user)
      });
    } catch (error) {
      response.status(400);
      if (error.code === 11000) {
        response.json({ auth: false, message: 'User already exist' });
      } else {
        response.json({ auth: false, message: error.message });
      }
    }
  }

  async login(request, response) {
    this.passport.authenticate('local', (error, user, info) => {
      if (error) {
        response.status(404).json({ auth: false, message: error.message });
      } else if (user) {
        response.status(200).json({
          auth: true,
          id: user.id,
          token: jwtService.generateJwt(user)
        });
      } else {
        response.status(401).json({ auth: false, message: info });
      }
    })(request, response);
  }
}

export default new AuthenticationController(userDao, passport);
