import Event from '../models/event';
import eventDao from '../dao';

class EventController {
  create = async (request, response) => {
    const event = new Event();
    event.address = request.body.address;

    try {
      await eventDao.create(event);
      response.status(200).end();
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  };

  readAll = async (request, response) => {
    const events = await eventDao.getAll();
    response.status(200).json(events);
  };
}

export default new EventController(eventDao);
