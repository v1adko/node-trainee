import userDao from '../dao';
import { passwordService } from '../services';
import jwtService from '../../services/jwtService';
import userController from './userController';

class UserProfileController {
  readMyProfile = async (request, response) => {
    request.params.id = request.user.id;
    userController.readById(request, response);
  };

  changePassword = async (request, response) => {
    if (request.user) {
      const { password, newPassword } = request.body;

      try {
        let user = await userDao.getById(request.user.id);
        user = await passwordService.change(user, password, newPassword);
        user = await userDao.updateById(request.user.id, user);

        response.status(200).json({
          auth: true,
          token: jwtService.generateJwt(user, user.role)
        });
      } catch (error) {
        response.status(400).json({ message: error.message });
      }
    } else {
      throw new Error(
        'User not found. Maybe you skipped or forgot do token verification'
      );
    }
  };
}

export default new UserProfileController();
