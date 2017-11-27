import userDao from '../dao';
import { passwordService, modelService } from '../services';
import jwtService from '../../../services/jwtService';

class UserProfileController {
  constructor(DAO) {
    this.DAO = DAO;

    this.readMyProfile = this.readMyProfile.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  async readMyProfile(request, response) {
    try {
      const user = await this.DAO.getById(request.user.id);
      if (user) {
        response.status(200).json(modelService.getSafeItem(user));
      } else {
        throw new Error("User doesn't exist");
      }
    } catch (error) {
      if (error.name === 'CastError') {
        response.status(400).json({ message: 'User id is invalid' });
      } else {
        response.status(400).json({ message: error.message });
      }
    }
  }

  async changePassword(request, response) {
    // TODO: Fix it
    if (request.user) {
      const { password, newPassword } = request.body;

      try {
        let user = await this.DAO.getById(request.user.id);
        user = await passwordService.change(user, password, newPassword);
        user = await this.DAO.updateById(request.user.id, user);

        response.status(200).json({
          auth: true,
          token: jwtService.generateJwt(user)
        });
      } catch (error) {
        response.status(400).json({ message: error.message });
      }
    } else {
      throw new Error(
        'User not found. Maybe you skipped or forgot do token verification'
      );
    }
  }
}

export default new UserProfileController(userDao);
