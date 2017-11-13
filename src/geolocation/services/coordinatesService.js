class CoordinatesService {
  constructor() {
    this.mapCoordinates = responsResult => responsResult.map(item =>
      ({
        address: item.formattedAddress,
        coordinates: { lat: item.latitude, lon: item.longitude }
      }));
  }
}

module.exports = new CoordinatesService();

