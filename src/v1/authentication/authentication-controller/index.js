import passport from 'passport';
import HttpStatus from 'http-status-codes';
import userService from '../user-service';
import requestValidator from '../../../lib/decorators/request-validation-decorator';
import authenticationSchema from './schema-validation';
import {
  EmptyAuthenticationField,
  ResourceDuplicateError,
  UserDuplicateError
} from '../../../errors';

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
      if (error.name === ResourceDuplicateError.name) {
        throw new UserDuplicateError();
      } else {
        throw error;
      }
    }
  }

  async login(request, response) {
    const { username, password } = request.data;
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

const EnhancedAuthenticationController = requestValidator(validationRules)(
  AuthenticationController
);

export default new EnhancedAuthenticationController(userService, passport);
