import { geocoder } from '../../../';

jest.setTimeout(10000);

describe('Test the receiving coordinates from address', () => {
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
