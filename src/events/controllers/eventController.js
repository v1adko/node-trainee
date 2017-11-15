import Event from '../models/event';
import { eventDao } from '../dao';

class EventController {
  create = (request, response) => {
    const event = new Event();
    event.address = request.body.address;

    eventDao
      .create(event)
      .then(() => {
        response.status(200).end();
      })
      .catch((error) => {
        response.status(400).json({ message: error.message });
      });
  };

  readAll = (request, response) => {
    eventDao.getAll().then((event) => {
      response.status(200).json(event);
    });
  };
}

export default new EventController();
