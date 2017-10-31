const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

require('./model');

const Event = mongoose.model('Event');

router.post('/', (req, res) => {
  const event = new Event();
  if (req.body.address) {
    event.address = req.body.address;
    event
      .setCoordinations()
      .then(result => result.save())
      .then(result => res.json(result))
      .catch((err) => { res.json({ message: err.message }); });
  } else {
    event.save((err, result) => { res.json(result); });
  }
});

router.get('/', (req, res) => {
  Event.find({}, (err, event) => res.json(event));
});

module.exports = router;
