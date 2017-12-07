import { compose } from 'ramda';
import HTTP_STATUS_CODE from 'http-status-codes';
import userDao from '../../user-dao';
import { modelService } from '../../services/';
import permissions from '../../../../constants/permissions';
import permissionValidation from '../../../../lib/decorators/permission-validation-decorator';
import requestValidator from '../../../../lib/decorators/request-validation-decorator';
import { NotFoundError } from '../../../../lib/errors';
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
  readAll: tokenOnlyShema,
  readById: idAndTokenSchema,
  readByName: readByNameSchema,
  create: createSchema,
  updateById: updateByIdSchema,
  deleteById: idAndTokenSchema
};

class UserController {
  constructor(DAO) {
    this.DAO = DAO;
  }

  async readAll(request, response) {
    const users = await this.DAO.getAll();
    response
      .status(HTTP_STATUS_CODE.OK)
      .json(modelService.mapSafeItems('id', users));
  }

  async readById(request, response) {
    const user = await this.DAO.getById(request.data.id);
    response.status(HTTP_STATUS_CODE.OK).json(modelService.getSafeItem(user));
  }

  async readByName(request, response) {
    const user = await this.DAO.get({ username: request.data.username });
    response
      .status(HTTP_STATUS_CODE.OK)
      .json(modelService.mapSafeItems('id', user));
  }

  async create(request, response) {
    const { username, password, role } = request.data;
    const user = await this.DAO.create(username, password, role);
    response.status(HTTP_STATUS_CODE.OK).json(modelService.getSafeItem(user));
  }

  async updateById(request, response) {
    const { username, password, role } = request.data;
    const user = await this.DAO.getById(request.data.id);

    if (!user) {
      throw new NotFoundError("User doesn't exist.");
    }

    if (username) {
      user.username = username;
    }
    if (password) {
      user.password = password;
    }
    if (role) {
      user.role = role;
    }
    await this.DAO.updateById(request.data.id, user);
    response
      .status(HTTP_STATUS_CODE.OK)
      .json({ status: true, message: 'User was updated' });
  }

  async deleteById(request, response) {
    await this.DAO.deleteById(request.data.id);
    response
      .status(HTTP_STATUS_CODE.OK)
      .json({ status: true, message: 'User was deleted' });
  }
}

const EnhancedUserController = compose(
  permissionValidation(permissionRules),
  requestValidator(validationRules)
)(UserController);

export default new EnhancedUserController(userDao);
