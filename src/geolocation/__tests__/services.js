const { geocoder } = require('../');

jest.setTimeout(10000);

describe('Test the receivingcoordinates from address', () => {
  it('should return coordinates', async () => {
    await geocoder.addressToCoordinates('kharkiv')
      .then((coordinates) => {
        expect(coordinates)
          .toEqual([{
            address: 'Kharkiv, Kharkiv Oblast, Ukraine',
            coordinates: { lat: 49.9935, lon: 36.230383 }
          }]);
      });
  });

  it('should reject if no exist matched of address', async () => {
    await
    expect(geocoder.addressToCoordinates(''))
      .rejects
      .toEqual(new Error('Response status code is 400'));
  });
});

describe('Test the receiving address fromcoordinates', () => {
  it('should return address', async () => {
    await geocoder.coordinatesToAddress(50, 30)
      .then((coordinates) => {
        expect(coordinates)
          .toEqual([{
            address: "Unnamed Road, Kyivs'ka oblast, Ukraine",
            coordinates: { lat: 49.999137, lon: 30.0019538 }
          }]);
      });
  });

  it('should reject if no exist matched ofcoordinates', async () => {
    await
    expect(geocoder.coordinatesToAddress(444, 444))
      .rejects
      .toEqual(new Error('Response status code is 400'));
  });
});
