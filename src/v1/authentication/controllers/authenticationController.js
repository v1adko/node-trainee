import passport from 'passport';
import HttpStatus from 'http-status-codes';
import userService from '../services/userService';

class AuthenticationController {
  constructor(service, authPassport) {
    this.userService = service;
    this.passport = authPassport;
  }

  async register(request, response) {
    const { username, password } = request.body;

    try {
      const responseData = await this.userService.registerUser(
        username,
        password
      );
      response.status(HttpStatus.OK).json(responseData);
    } catch (error) {
      if (error.code === 11000) {
        response
          .status(HttpStatus.METHOD_NOT_ALLOWED) // TODO 'Allow'
          .json({ auth: false, message: 'User already exist' });
      } else {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ auth: false, message: error.message });
      }
    }
  }

  async login(request, response) {
    this.passport.authenticate('local', async (error, user, info) => {
      if (error) {
        response
          .status(HttpStatus.NOT_FOUND)
          .json({ auth: false, message: error.message });
      } else if (user) {
        const responseData = this.userService.generateUserResponse(user);
        response.status(HttpStatus.OK).json(responseData);
      } else {
        response
          .status(HttpStatus.UNAUTHORIZED)
          .json({ auth: false, message: info });
      }
    })(request, response);
  }
}

export default new AuthenticationController(userService, passport);
