class CoordinatesService {
  mapCoordinates = responsResult =>
    responsResult.map(item => ({
      address: item.formattedAddress,
      coordinates: { lat: item.latitude, lon: item.longitude }
    }));
}

const instance = new CoordinatesService();

export default instance;
