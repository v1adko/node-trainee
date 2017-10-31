const ctrl = require('../controllers');

module.exports.addressToCoordinations = (req, res) => {
	ctrl.addressToCoordinations(req.params.address)
		.then(coordinations => res.json(coordinations))
		.catch(err => {
			console.log("mid-------------", err);

			res.json({message: err.message})
		});
}


module.exports.coordinationsToAddress = (req, res) => {
	ctrl.coordinationsToAddress(req.params.lat, req.params.lon)
		.then(address => res.json(address))
		.catch(err => res.json(err));
}