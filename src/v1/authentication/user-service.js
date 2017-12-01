import userDao from '../users/user-dao';
import jwtService from '../services/jwt-service';

class UserService {
  constructor(jwt, DAO) {
    this.jwtService = jwt;
    this.DAO = DAO;
  }

  generateUserResponse(user) {
    const response = {
      auth: true,
      id: user.id,
      token: this.jwtService.generateJwt(user)
    };

    return response;
  }

  async registerUser(username, password) {
    const user = await this.DAO.create(username, password);

    const response = this.generateUserResponse(user);
    return response;
  }
}

export default new UserService(jwtService, userDao);
