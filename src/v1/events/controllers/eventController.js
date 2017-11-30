import HttpStatus from 'http-status-codes';
import Event from '../models/event';
import eventDao from '../dao';

class EventController {
  constructor(DAO) {
    this.DAO = DAO;
  }
  async create(request, response) {
    const event = new Event();
    event.address = request.body.address;

    await this.DAO.create(event);
    response.status(HttpStatus.OK).end();
  }

  async readAll(request, response) {
    const events = await this.DAO.getAll();
    response.status(HttpStatus.OK).json(events);
  }
}

export default new EventController(eventDao);
