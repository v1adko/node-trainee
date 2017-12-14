import { compose } from 'ramda';
import HTTP_STATUS_CODE from 'http-status-codes';
import userDao from '../../user-dao';
import { modelService, getCleanDataService } from '../../services/';
import permissions from '../../../../constants/permissions';
import permissionValidation from '../../../../lib/decorators/permission-validation-decorator';
import requestValidator from '../../../../lib/decorators/request-validation-decorator';
import {
  readSchema,
  createSchema,
  updateByIdSchema,
  idAndTokenSchema
} from './schema-validation';

const permissionRules = {
  read: permissions.USER,
  readById: permissions.USER,
  create: permissions.ADMIN,
  updateById: permissions.ADMIN,
  deleteById: permissions.ADMIN
};

const validationRules = {
  read: readSchema,
  readById: idAndTokenSchema,
  create: createSchema,
  updateById: updateByIdSchema,
  deleteById: idAndTokenSchema
};

class UserController {
  constructor(DAO) {
    this.DAO = DAO;
  }

  async read(request, response) {
    const { username, role, id } = request.data;
    const filterData = { username, role, id };
    const cleanFilterData = getCleanDataService(filterData);

    const users = await this.DAO.get(cleanFilterData);
    response
      .status(HTTP_STATUS_CODE.OK)
      .json(modelService.mapSafeItems('id', users));
  }

  async readById(request, response) {
    const user = await this.DAO.getById(request.data.id);
    response.status(HTTP_STATUS_CODE.OK).json(modelService.getSafeItem(user));
  }

  async create(request, response) {
    const { username, password, role } = request.data;
    const user = await this.DAO.create(username, password, role);
    response.status(HTTP_STATUS_CODE.OK).json(modelService.getSafeItem(user));
  }

  async updateById(request, response) {
    const { username, password, role } = request.data;
    const user = await this.DAO.getById(request.data.id);

    const filterData = { username, password, role };
    const cleanFilterData = getCleanDataService(filterData);

    Object.keys(cleanFilterData).forEach((key) => {
      user[key] = cleanFilterData[key];
    });

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
