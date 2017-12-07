import passport from 'passport';
import HTTP_STATUS_CODE from 'http-status-codes';
import userService from '../user-service';
import requestValidator from '../../../lib/decorators/request-validation-decorator';
import authenticationSchema from './schema-validation';

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

  async login(request, response) {
    this.passport.authenticate('local', async (error, user, info) => {
      if (error) {
        response
          .status(HTTP_STATUS_CODE.NOT_FOUND)
          .json({ auth: false, message: error.message });
      } else if (user) {
        const responseData = this.userService.generateUserResponse(user);
        response.status(HTTP_STATUS_CODE.OK).json(responseData);
      } else {
        response
          .status(HTTP_STATUS_CODE.UNAUTHORIZED)
          .json({ auth: false, message: info });
      }
    })(request, response);
  }
}

const EnhancedAuthenticationController = requestValidator(validationRules)(
  AuthenticationController
);

export default new EnhancedAuthenticationController(userService, passport);
