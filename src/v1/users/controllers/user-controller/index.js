import HttpStatus from 'http-status-codes';
import userDao from '../../user-dao';
import { modelService } from '../../services/';
import permissions from '../../../../constants/permissions';
import permissionValidation from '../../../../lib/decorators/permission-validation-decorator';
import requestValidator from '../../../../lib/decorators/request-validation-decorator';
import {
  tokenOnlyShema,
  createSchema,
  updateByIdSchema,
  idAndTokenSchema,
  readByNameSchema
} from './schema-validation';

const permissionRules = {
  readAll: permissions.USER,
  readById: permissions.USER,
  readByName: permissions.USER,
  create: permissions.ADMIN,
  updateById: permissions.ADMIN,
  deleteById: permissions.ADMIN
};

const validationRules = {
  create: createSchema,
  updateById: updateByIdSchema
};

class UserController {
  constructor(DAO) {
    this.DAO = DAO;
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
    const { username, password, role } = request.data;
    const user = await this.DAO.getById(request.data.id);

    if (username) {
      user.username = username;
    }
    if (password) {
      user.password = password;
    }
    if (role) {
      user.role = role;
    }

    await this.DAO.updateById(request.params.id, user);
    response.status(HttpStatus.OK).json({ message: 'User was updated' });
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
}

const EnhancedUserControllerByPermissionValidation = permissionValidation(
  permissionRules
)(UserController);

const EnhancedUserControllerByRequestValidation = requestValidator(
  validationRules
)(EnhancedUserControllerByPermissionValidation);

export default new EnhancedUserControllerByRequestValidation(userDao);
