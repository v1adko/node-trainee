import userDao from '../dao';
import User from '../models/user';
import { modelService } from '../services/';

class UserController {
  readAll = async (request, response) => {
    const users = await userDao.getAll();
    response.status(200).json(modelService.mapSafeItems('_id', users));
  };

  readById = async (request, response) => {
    try {
      const user = await userDao.getById(request.params.id);
      if (user) {
        response.status(200).json(modelService.getSafeItem(user));
      } else {
        throw new Error("User doesn't exist");
      }
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  };

  readByName = async (request, response) => {
    try {
      const user = await userDao.get({ username: request.params.username });
      response.status(200).json(modelService.mapSafeItems('_id', user));
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  };

  create = async (request, response) => {
    const user = new User();
    const { username, password } = request.body;
    user.username = username;
    user.password = password;

    try {
      await userDao.create(user);
      response.status(200).json(modelService.getSafeItem(user));
    } catch (error) {
      if (error.code === 11000) {
        response.json({ message: 'User already exist' });
      } else {
        response.json({ message: error.message });
      }
    }
  };

  updateById = async (request, response) => {
    const { username, password } = request.body;

    try {
      await userDao.updateById(request.params.id, { username, password });
      response.status(200).json({ message: 'User was updated' });
    } catch (error) {
      let { message } = error;
      if (error.name === 'CastError') {
        message = "User doesn't exist";
      }
      response.status(400).json({ message });
    }
  };

  deleteById = async (request, response) => {
    try {
      const user = await userDao.deleteById(request.params.id);
      if (user.result.n) {
        response.status(200).json({ message: 'User was deleted' });
        return;
      }
      throw new Error("User doesn't exist");
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  };
}

export default new UserController();
