const express = require('express');
const Event = require('./model');

const router = express.Router();

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
