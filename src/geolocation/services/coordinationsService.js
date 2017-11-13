class CoordinationsService {
  constructor() {
    this.mapCoordinations = responsResult => responsResult.map(item =>
      ({
        address: item.formattedAddress,
        coordinations: { lat: item.latitude, lon: item.longitude }
      }));
  }
}

module.exports = new CoordinationsService();

