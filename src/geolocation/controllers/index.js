const NodeGeocoder = require('node-geocoder');

const options = require('../config');

const geocoder = NodeGeocoder(options);

module.exports.addressToCoordination = (address) => {
  return geocoder.geocode(address)
    .then(result => ({
      lat: result[0].latitude,
      lon: result[0].longitude
    }))
    .catch(err => err);
}

module.exports.coordinationToAddress = (lat, lon) => {
  return geocoder.reverse({
      lat,
      lon
    })
    .then((result) => ({
      address: result[0].formattedAddress
    }))
    .catch(err => err);
}