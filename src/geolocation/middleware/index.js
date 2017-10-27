var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyDcCAmvDWDLJF3k7Ni-UJKRWunYMvl_jak', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

// Or using Promise


module.exports.doRequest = (req, res) => {
  geocoder.geocode('29 champs elysée paris')
    .then(function(result) {
      // console.log('second', result);
      res.json(result);
    })
    .catch(function(err) {
      // console.log(err);
      res.json(err);
    });
}



// const https = require('https');
// var StringDecoder = require('string_decoder').StringDecoder;

// let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDcCAmvDWDLJF3k7Ni-UJKRWunYMvl_jak';

// module.exports.doRequest = (req, res) => {
//  https.get(url, (response) => {
//      if (response.statusCode >= 300 && response.statusCode <= 400 && response.headers.location) {
//          doRequest(response.headers.location);

//      }

//      response.on('data', (d) => {

//          // console.log(JSON.stringify(d));



//          // console.log(process.stdout.write(d));
//          // console.log(d.toString('utf8'));
//          res.send(JSON.parse(d.toString('utf8')));
//          // res.send(d.toString('utf8').replace(/\r|\n|\\/g, ''));
//      });

//  }).on('error', (e) => {
//      console.error(e);
//  });
// }

// // doRequest(url);