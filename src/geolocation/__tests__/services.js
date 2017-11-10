const { geocoder } = require('../');

describe('Test the receiving coordinations from address', () => {
  test('It should return coordinates', async () => {
    await geocoder.addressToCoordinations('kharkiv')
      .then((coordinations) => {
        expect(coordinations)
          .toEqual([{ address: 'Kharkiv, Kharkiv Oblast, Ukraine', coordinations: { lat: 49.9935, lon: 36.230383 } }]);
      });
  });

  test('should reject if no exist matched of address', async () => {
    await
    expect(geocoder.addressToCoordinations(''))
      .rejects
      .toEqual(new Error('Response status code is 400'));
  });
});

describe('Test the receiving address from coordinations', () => {
  test('It should return address', async () => {
    await geocoder.coordinationsToAddress(50, 30)
      .then((coordinations) => {
        expect(coordinations)
          .toEqual([{ address: "Unnamed Road, Kyivs'ka oblast, Ukraine", coordinations: { lat: 49.999137, lon: 30.0019538 } }]);
      });
  });

  test('It should return address', async () => {
    await
    expect(geocoder.coordinationsToAddress(444, 444))
      .rejects
      .toEqual(new Error('Response status code is 400'));
  });
});
