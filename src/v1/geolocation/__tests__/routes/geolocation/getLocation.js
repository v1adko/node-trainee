import simulate from '../../../../../tests/requestHelper';

jest.setTimeout(10000);

describe('Test the "/v1/geolocation/:location" path', () => {
  it('should response the GET method', async () => {
    const result = await simulate.get('/v1/geolocation/kharkiv', 200);
    expect(result.body[0].address).toBe('Kharkiv, Kharkiv Oblast, Ukraine');
    expect(result.body[0].coordinates).toEqual({
      lat: 49.9935,
      lon: 36.230383
    });
  });

  it('should response the GET method', async () => {
    const result = await simulate.get('/v1/geolocation/50fasdfasdf3fd32d', 200);
    expect(result.body).toEqual([]);
  });
});
