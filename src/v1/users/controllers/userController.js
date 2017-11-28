import HttpStatus from 'http-status-codes';
import userDao from '../dao';
import { modelService } from '../services/';

class UserController {
  constructor(DAO) {
    this.DAO = DAO;
    // this.create = this.create.bind(this);
    // this.readAll = this.readAll.bind(this);
    // this.readById = this.readById.bind(this);
    // this.readByName = this.readByName.bind(this);
    // this.updateById = this.updateById.bind(this);
    // this.deleteById = this.deleteById.bind(this);
  }

  async readAll(request, response) {
    const users = await this.DAO.getAll();
    response.status(HttpStatus.OK).json(modelService.mapSafeItems('id', users));
  }

  async readById(request, response) {
    try {
      const user = await this.DAO.getById(request.params.id);
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

  async readByName(request, response) {
    try {
      const user = await this.DAO.get({ username: request.params.username });
      response
        .status(HttpStatus.OK)
        .json(modelService.mapSafeItems('id', user));
    } catch (error) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  async create(request, response) {
    const { username, password, role } = request.body;

    try {
      const user = await this.DAO.create(username, password, role);
      response.status(HttpStatus.OK).json(modelService.getSafeItem(user));
    } catch (error) {
      if (error.code === 11000) {
        response
          .status(HttpStatus.METHOD_NOT_ALLOWED)
          .json({ message: 'User already exist' }); // TODO: Header "Allow"
      } else {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
    }
  }

  async updateById(request, response) {
    const { body: fields } = request;

    try {
      await this.DAO.updateById(request.params.id, fields);
      response.status(HttpStatus.OK).json({ message: 'User was updated' });
    } catch (error) {
      if (error.name === 'CastError') {
        response
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "User doesn't exist" });
      } else {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
    }
  }

  async deleteById(request, response) {
    try {
      const user = await this.DAO.deleteById(request.params.id);
      if (user.result.n) {
        response.status(HttpStatus.OK).json({ message: 'User was deleted' });
        return;
      }
      throw new Error("User doesn't exist");
    } catch (error) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}

export default new UserController(userDao);
