const NodeGeocoder = require('node-geocoder');

const options = require('../config');

const geocoder = NodeGeocoder(options);

function mapCoordinations(responsResult) {
  return responsResult.map(item => ({ lat: item.latitude, lon: item.longitude }));
}

const addressToCoordinations = address => geocoder
  .geocode(address)
  .then((result) => {
    if (result.length === 0) {
      throw new Error("Dos't have any matches");
    } else { return mapCoordinations(result); }
  })
  .catch((err) => { throw err; });

const coordinationsToAddress = (lat, lon) =>
  geocoder
    .reverse({ lat, lon })
    .then(result => ({ address: result[0].formattedAddress }))
    .catch((err) => { throw err; });


module.exports = {
  addressToCoordinations,
  coordinationsToAddress
};

