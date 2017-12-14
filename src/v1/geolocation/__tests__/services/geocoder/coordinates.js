import { geocoder } from '../../../';

jest.setTimeout(10000);

describe('Test the receiving address from coordinates', () => {
  it('should return address', async () => {
    const address = await geocoder.coordinatesToAddress(50, 30);
    expect(address).toMatchSnapshot();
  });

  it('should reject if no exist matched of coordinates', async () => {
    const error = await geocoder.coordinatesToAddress(444, 444);
    expect(error).toMatchSnapshot();
  });
});
