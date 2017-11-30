import HttpStatus from 'http-status-codes';
import userDao from '../dao';
import { passwordService, modelService } from '../services';
import jwtService from '../../../services/jwtService';
import permissions from '../../../constants/permissions';
import PermissionDecorator from '../../../utils/permissionDecorator';

const methodPermissions = {
  readMyProfile: permissions.USER,
  changePassword: permissions.USER
};

class UserProfileController {
  constructor(DAO) {
    this.DAO = DAO;
  }

  async readMyProfile(request, response) {
    try {
      const user = await this.DAO.getById(request.user.id);
      if (user) {
        response.status(HttpStatus.OK).json(modelService.getSafeItem(user));
      } else {
        throw new Error("User doesn't exist");
      }
    } catch (error) {
      if (error.name === 'CastError') {
        response
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'User id is invalid' });
      } else {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
    }
  }

  async changePassword(request, response) {
    if (request.user) {
      const { password, newPassword } = request.body;

      if (!password || !newPassword) {
        throw new Error('All fields required');
      }

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
    } else {
      throw new Error(
        'User not found. Maybe you skipped or forgot do token verification'
      );
    }
  }
}

const userProfileController = new UserProfileController(userDao);

export default PermissionDecorator(userProfileController, methodPermissions);
