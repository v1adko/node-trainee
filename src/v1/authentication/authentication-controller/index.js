import passport from 'passport';
import HttpStatus from 'http-status-codes';
import userService from '../user-service';
import { EmptyAuthenticationField } from '../../../lib/errors';
import requestValidator from '../../../lib/decorators/request-validation-decorator';
import authenticationSchema from './schema-validation';
import { AuthorizationError } from '../../../lib/errors';

const validationRules = {
  register: authenticationSchema,
  login: authenticationSchema
};

class AuthenticationController {
  constructor(service, authPassport) {
    this.userService = service;
    this.passport = authPassport;
  }

  async register(request, response) {
    const { username, password } = request.data;
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

  async login(request, response, next) {
    this.passport.authenticate('local', async (error, user, info) => {
      if (!error && user) {
        const responseData = this.userService.generateUserResponse(user);
        response.status(HttpStatus.OK).json(responseData);
      } else {
        next(error || new AuthorizationError(info));
      }
    })(request, response);
  }
}

const EnhancedAuthenticationController = requestValidator(validationRules)(
  AuthenticationController
);

export default new EnhancedAuthenticationController(userService, passport);
