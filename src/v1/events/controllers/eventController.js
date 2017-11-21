import Event from '../models/event';
import eventDao from '../dao';

class EventController {
  constructor(DAO) {
    this.DAO = DAO;
  }
  create = async (request, response) => {
    const event = new Event();
    event.address = request.body.address;

    try {
      await this.DAO.create(event);
      response.status(200).end();
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  };

  readAll = async (request, response) => {
    const events = await this.DAO.getAll();
    response.status(200).json(events);
  };
}

export default new EventController(eventDao);
