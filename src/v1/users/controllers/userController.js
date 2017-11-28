import userDao from '../dao';
import { modelService } from '../services/';

class UserController {
  constructor(DAO) {
    this.DAO = DAO;
    this.create = this.create.bind(this);
    this.readAll = this.readAll.bind(this);
    this.readById = this.readById.bind(this);
    this.readByName = this.readByName.bind(this);
    this.updateById = this.updateById.bind(this);
    this.deleteById = this.deleteById.bind(this);
  }

  async readAll(request, response) {
    const users = await this.DAO.getAll();
    response.status(200).json(modelService.mapSafeItems('id', users));
  }

  async readById(request, response) {
    try {
      const user = await this.DAO.getById(request.params.id);
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

  async readByName(request, response) {
    try {
      const user = await this.DAO.get({ username: request.params.username });
      response.status(200).json(modelService.mapSafeItems('id', user));
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }

  async create(request, response) {
    const { username, password, role } = request.body;

    try {
      const user = await this.DAO.create(username, password, role);
      response.status(200).json(modelService.getSafeItem(user));
    } catch (error) {
      if (error.code === 11000) {
        response.status(409).json({ message: 'User already exist' });
      } else {
        response.status(400).json({ message: error.message });
      }
    }
  }

  async updateById(request, response) {
    const { body: fields } = request;

    try {
      await this.DAO.updateById(request.params.id, fields);
      response.status(200).json({ message: 'User was updated' });
    } catch (error) {
      let { message } = error;
      if (error.name === 'CastError') {
        message = "User doesn't exist";
      }
      response.status(400).json({ message });
    }
  }

  async deleteById(request, response) {
    try {
      const user = await this.DAO.deleteById(request.params.id);
      if (user.result.n) {
        response.status(200).json({ message: 'User was deleted' });
        return;
      }
      throw new Error("User doesn't exist");
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }
}

export default new UserController(userDao);
