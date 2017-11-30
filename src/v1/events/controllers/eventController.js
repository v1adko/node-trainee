import HttpStatus from 'http-status-codes';
import Event from '../models/event';
import eventDao from '../dao';
import permissions from '../../../constants/permissions';

class EventController {
  constructor(DAO) {
    this.DAO = DAO;
    this.permissionLevel = {
      create: permissions.USER,
      readAll: permissions.USER
    };
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

export default new EventController(eventDao);
