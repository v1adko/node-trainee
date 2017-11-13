const Event = require('../models/event');
const { eventDao } = require('../dao');

class EventController {
  constructor() {
    this.create = (req, res) => {
      const event = new Event();
      event.address = req.body.address;

      eventDao.create(event)
        .then((updatedEvent) => { res.status(200).json(updatedEvent); })
        .catch((err) => { res.status(400).json({ message: err.message }); });
    };

    this.readAll = (req, res) => {
      eventDao.getAll()
        .then((event) => { res.status(200).json(event); });
    };
  }
}

module.exports = new EventController();

