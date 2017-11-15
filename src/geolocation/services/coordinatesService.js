class CoordinatesService {
  mapCoordinates = responsResult =>
    responsResult.map(item => ({
      address: item.formattedAddress,
      coordinates: { lat: item.latitude, lon: item.longitude }
    }));
}

export default new CoordinatesService();
