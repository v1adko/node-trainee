import { geocoder } from '../../../';

jest.setTimeout(10000);

describe('Test the receiving address from coordinates', () => {
  it('should return address', async () => {
    const address = await geocoder.coordinatesToAddress(50, 30);
    expect(address).toEqual([
      {
        address: "Unnamed Road, Kyivs'ka oblast, Ukraine",
        coordinates: { lat: 49.999137, lon: 30.0019538 }
      }
    ]);
  });

  it('should reject if no exist matched of coordinates', async () => {
    const error = await geocoder.coordinatesToAddress(444, 444);
    expect(error).toEqual({
      error: 'Error',
      message: 'Response status code is 400'
    });
  });
});
