import HttpStatus from 'http-status-codes';
import Event from '../models/event';
import eventDao from '../dao';
import permissions from '../../../constants/permissions';
import setPermissions from '../../../utils/setPermissions';

const methodPermissions = {
  create: permissions.USER,
  readAll: permissions.USER
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

const eventController = new EventController(eventDao);
setPermissions(eventController, methodPermissions);

export default eventController;
