import R from 'ramda';
import HttpStatus from 'http-status-codes';
import userDao from '../../user-dao';
import { passwordService, modelService } from '../../services';
import jwtService from '../../../services/jwt-service';
import permissions from '../../../../constants/permissions';
import permissionValidation from '../../../../lib/decorators/permission-validation-decorator';
import requestValidator from '../../../../lib/decorators/request-validation-decorator';
import changePasswordSchema from './schema-validation';

const permissionRules = {
  readAll: permissions.USER,
  readById: permissions.USER,
  readByName: permissions.USER,
  create: permissions.ADMIN,
  updateById: permissions.ADMIN,
  deleteById: permissions.ADMIN
};

const validationRules = {
  changePassword: changePasswordSchema
};

class UserProfileController {
  constructor(DAO) {
    this.DAO = DAO;
  }

  async readMyProfile(request, response) {
    const user = await this.DAO.getById(request.user.id);
    if (user) {
      response.status(HttpStatus.OK).json(modelService.getSafeItem(user));
    } else {
      throw new Error("User doesn't exist");
    }
  }

  async changePassword(request, response) {
    const { password, newPassword } = request.data;

    try {
      let user = await this.DAO.getById(request.user.id);
      passwordService.change(user, password, newPassword);
      user = await this.DAO.updateById(request.user.id, user);

      response.status(HttpStatus.OK).json({
        auth: true,
        token: jwtService.generateJwt(user)
      });
    } catch (error) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}

const EnhancedUserProfileController = R.compose(
  permissionValidation(permissionRules),
  requestValidator(validationRules)
)(UserProfileController);

export default new EnhancedUserProfileController(userDao);
