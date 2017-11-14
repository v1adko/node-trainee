class CoordinatesService {
  mapCoordinates = responsResult => responsResult.map(item =>
    ({
      address: item.formattedAddress,
      coordinates: { lat: item.latitude, lon: item.longitude }
    }));
}

// module.exports = new CoordinatesService();

const instance = new CoordinatesService();

export default instance;
