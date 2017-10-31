const NodeGeocoder = require('node-geocoder');

const options = require('../config');

const geocoder = NodeGeocoder(options);

function mapCoordinations(responsResult) {
  return responsResult.map(item => ({
    lat: item.latitude,
    lon: item.longitude
  }));
}

module.exports.addressToCoordinations = (address) => {
  // console.log(address);
  return geocoder.geocode(address)
    .then(result => {
      // console.log("==========\n", result.length, "\n==========");
      console.log("111", mapCoordinations(result));
      if (result.length == 0) {
        throw new Error("Dos't have any matches");
      } else if (result.length == 1) {
        return mapCoordinations(result);
      }
    })
    .catch(err => {
      throw err;
    });
}

module.exports.coordinationsToAddress = (lat, lon) => {
  return geocoder.reverse({
      lat,
      lon
    })
    .then((result) => ({
      address: result[0].formattedAddress
    }))
    .catch(err => err);
}