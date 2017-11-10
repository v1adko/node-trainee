const Event = require('../models/event');
const { eventDao } = require('../dao');

const create = (req, res) => {
  const event = new Event();
  event.address = req.body.address;

  eventDao.create(event)
    .catch((err) => { res.status(400).json({ message: err.message }); })
    .then((updatedEvent) => { res.status(200).json(updatedEvent); })
    .catch(() => { res.status(400).json({ message: 'event already exist' }); });
};

const readAll = (req, res) => {
  eventDao.getAll()
    .then((event) => { res.status(200).json(event); });
};

module.exports = {
  create,
  readAll
};

