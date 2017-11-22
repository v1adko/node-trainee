import { geocoder } from '../../../';

jest.setTimeout(10000);

describe('Test the receivingcoordinates from address', () => {
  it('should return coordinates', async () => {
    const coordinates = await geocoder.addressToCoordinates('kharkiv');
    expect(coordinates).toEqual([
      {
        address: 'Kharkiv, Kharkiv Oblast, Ukraine',
        coordinates: { lat: 49.9935, lon: 36.230383 }
      }
    ]);
  });

  it('should reject if no exist matched of address', async () => {
    const error = await geocoder.addressToCoordinates('');
    expect(error).toEqual({
      error: 'Error',
      message: 'Response status code is 400'
    });
  });
});

describe('Test the receiving address fromcoordinates', () => {
  it('should return address', async () => {
    const address = await geocoder.coordinatesToAddress(50, 30);
    expect(address).toEqual([
      {
        address: "Unnamed Road, Kyivs'ka oblast, Ukraine",
        coordinates: { lat: 49.999137, lon: 30.0019538 }
      }
    ]);
  });

  it('should reject if no exist matched ofcoordinates', async () => {
    const error = await geocoder.coordinatesToAddress(444, 444);
    expect(error).toEqual({
      error: 'Error',
      message: 'Response status code is 400'
    });
  });
});
