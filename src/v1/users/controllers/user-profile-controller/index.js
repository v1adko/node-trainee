import HTTP_STATUS_CODE from 'http-status-codes';
import userDao from '../../user-dao';
import { passwordService, modelService } from '../../services';
import jwtService from '../../../services/jwt-service';
import requestValidator from '../../../../lib/decorators/request-validation-decorator';
import { changePasswordSchema, readMyProfileSchema } from './schema-validation';

const validationRules = {
  changePassword: changePasswordSchema,
  readMyProfile: readMyProfileSchema
};

class UserProfileController {
  constructor(DAO) {
    this.DAO = DAO;
  }

  async readMyProfile(request, response) {
    const user = await this.DAO.getById(request.user.id);
    response.status(HTTP_STATUS_CODE.OK).json(modelService.getSafeItem(user));
  }

  async changePassword(request, response) {
    const { password, newPassword } = request.data;

    let user = await this.DAO.getById(request.user.id);
    passwordService.change(user, password, newPassword);
    user = await this.DAO.updateById(request.user.id, user);

    response.status(HTTP_STATUS_CODE.OK).json({
      auth: true,
      token: jwtService.generateJwt(user)
    });
  }
}

const EnhancedUserProfileController = requestValidator(validationRules)(
  UserProfileController
);

export default new EnhancedUserProfileController(userDao);
