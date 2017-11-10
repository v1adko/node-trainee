const { geocoderRouter: router } = require('./routers');
const { geolocationService: geocoder } = require('./services');

module.exports = {
  router,
  geocoder
};

