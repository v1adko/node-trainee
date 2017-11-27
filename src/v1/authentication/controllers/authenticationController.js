import passport from 'passport';
import userService from '../services/userService';

class AuthenticationController {
  constructor(service, authPassport) {
    this.userService = service;
    this.passport = authPassport;

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(request, response) {
    const { username, password } = request.body;

    try {
      const responseData = await this.userService.registerUser(
        username,
        password
      );
      response.status(200).json(responseData);
    } catch (error) {
      if (error.code === 11000) {
        response
          .status(409)
          .json({ auth: false, message: 'User already exist' });
      } else {
        response.status(400).json({ auth: false, message: error.message });
      }
    }
  }

  async login(request, response) {
    this.passport.authenticate('local', async (error, user, info) => {
      if (error) {
        response.status(404).json({ auth: false, message: error.message });
      } else if (user) {
        const responseData = await this.userService.generateUserResponse(user);
        response.status(200).json(responseData);
      } else {
        response.status(401).json({ auth: false, message: info });
      }
    })(request, response);
  }
}

export default new AuthenticationController(userService, passport);
