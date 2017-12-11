import passport from 'passport';
import HTTP_STATUS_CODE from 'http-status-codes';
import userService from '../user-service';
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
    const responseData = await this.userService.registerUser(
      username,
      password
    );
    response.status(HTTP_STATUS_CODE.OK).json(responseData);
  }

  async login(request, response, next) {
    this.passport.authenticate('local', async (error, user, info) => {
      if (!error && user) {
        const responseData = this.userService.generateUserResponse(user);
        response.status(HTTP_STATUS_CODE.OK).json(responseData);
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
