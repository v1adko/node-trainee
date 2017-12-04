import R from 'ramda';
import HttpStatus from 'http-status-codes';
import Event from '../event-model';
import eventDao from '../event-dao';
import permissions from '../../../constants/permissions';
import permissionValidation from '../../../lib/decorators/permission-validation-decorator';
import requestValidator from '../../../lib/decorators/request-validation-decorator';
import createEventSchema from './schema-validation';

const permissionRules = {
  create: permissions.USER,
  readAll: permissions.USER
};

const validationRules = {
  create: createEventSchema
};

class EventController {
  constructor(DAO) {
    this.DAO = DAO;
  }

  async create(request, response) {
    const event = new Event();
    event.address = request.body.address;

    try {
      await this.DAO.create(event);
      response.status(HttpStatus.OK).end();
    } catch (error) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  async readAll(request, response) {
    const events = await this.DAO.getAll();
    response.status(HttpStatus.OK).json(events);
  }
}

const EnhancedEventController = R.compose(
  permissionValidation(permissionRules),
  requestValidator(validationRules)
)(EventController);

export default new EnhancedEventController(eventDao);
