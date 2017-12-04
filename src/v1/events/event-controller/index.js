import { compose } from 'ramda';
import HTTP_STATUS_CODE from 'http-status-codes';
import Event from '../event-model';
import eventDao from '../event-dao';
import permissions from '../../../constants/permissions';
import permissionValidation from '../../../lib/decorators/permission-validation-decorator';
import requestValidator from '../../../lib/decorators/request-validation-decorator';
import { createEventSchema, tokenOnlySchema } from './schema-validation';

const permissionRules = {
  create: permissions.USER,
  readAll: permissions.USER
};

const validationRules = {
  create: createEventSchema,
  readAll: tokenOnlySchema
};

class EventController {
  constructor(DAO) {
    this.DAO = DAO;
  }

  async create(request, response) {
    const event = new Event();
    event.address = request.data.address;

    await this.DAO.create(event);
    response.status(HTTP_STATUS_CODE.OK).end();
  }

  async readAll(request, response) {
    const events = await this.DAO.getAll();
    response.status(HTTP_STATUS_CODE.OK).json(events);
  }
}

const EnhancedEventController = compose(
  permissionValidation(permissionRules),
  requestValidator(validationRules)
)(EventController);

export default new EnhancedEventController(eventDao);
