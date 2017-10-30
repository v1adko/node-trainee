let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


require('./model');
let Event = mongoose.model('Event')

router.post('/', (req, res) => {
	console.log(req.body.address);
	let event = new Event();
	event.address = req.body.address;
	event.setCoordinations()
		.then(event => event.save())
		.then(event => res.json(event));
});

router.get('/', (req, res) => {
	Event.find({}, (err, event) => res.json(event));
});



module.exports = router;