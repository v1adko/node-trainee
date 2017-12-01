import passport from 'passport';
import HttpStatus from 'http-status-codes';
import Joi from 'joi';
import userService from './user-service';
import { EmptyAuthenticationField } from '../../lib/errors';
import requestValidator from '../../utils/request-validation-decorator';

const validationSchema = Joi.object().keys({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .alphanum()
    .min(6)
    .max(30)
    .required()
});

class AuthenticationController {
  constructor(service, authPassport) {
    this.userService = service;
    this.passport = authPassport;
  }

  async register(request, response) {
    const { username, password } = request.body;
    if (!username || !password) {
      throw new EmptyAuthenticationField();
    }
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
    const { username, password } = request.body;
    if (!username || !password) {
      throw new EmptyAuthenticationField();
    }
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

const EnhancedAuthenticationController = requestValidator(validationSchema)(
  AuthenticationController
);

export default new EnhancedAuthenticationController(userService, passport);
