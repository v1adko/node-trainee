import { geocoder } from '../../../';

jest.setTimeout(10000);

describe('Test the receiving coordinates from address', () => {
  it('should return coordinates', async () => {
    const coordinates = await geocoder.addressToCoordinates('kharkiv');
    expect(coordinates).toMatchSnapshot();
  });

  it('should reject if no exist matched of address', async () => {
    const error = await geocoder.addressToCoordinates('');
    expect(error).toMatchSnapshot();
  });
});
