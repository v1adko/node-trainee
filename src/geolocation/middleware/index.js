const https = require('https');
var StringDecoder = require('string_decoder').StringDecoder;

let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDcCAmvDWDLJF3k7Ni-UJKRWunYMvl_jak';

module.exports.doRequest = (req, res) => {
	https.get(url, (response) => {
		if (response.statusCode >= 300 && response.statusCode <= 400 && response.headers.location) {
			doRequest(response.headers.location);

		}

		response.on('data', (d) => {

			// console.log(JSON.stringify(d));



			// console.log(process.stdout.write(d));
			// console.log(d.toString('utf8'));
			res.json(JSON.parse(d.toString()));
			// res.send(d.toString('utf8').replace(/\r|\n|\\/g, ''));
		});

	}).on('error', (e) => {
		console.error(e);
	});
}

// doRequest(url);