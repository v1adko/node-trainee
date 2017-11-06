const { geocoder } = require('../');

describe.only('Test the receiving coordinations from address', () => {
  test('It should return coordinates', () => {
    geocoder.addressToCoordinations('kharkiv')
      .then((coordinations) => {
        expect(coordinations)
          .toEqual([{ lat: 49.9935, lon: 36.230383 }]);
      });
  });

  test('should reject if no exist matched of address', () =>
    expect(geocoder.addressToCoordinations(''))
      .rejects
      .toEqual(new Error('Response status code is 400')));
});

describe.only('Test the receiving address from coordinations', () => {
  test('It should return address', () => {
    geocoder.coordinationsToAddress(50, 30)
      .then((coordinations) => {
        expect(coordinations)
          .toEqual({ address: "Unnamed Road, Kyivs'ka oblast, Ukraine" });
      });
  });
});
