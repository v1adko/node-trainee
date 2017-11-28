import simulate from '../../../utils/tests/requestHelper';

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

describe('Test the "/v1/geolocation/:lat/:lon" path', () => {
  it('should response the GET method', async () => {
    const result = await simulate.get('/v1/geolocation/50/30', 200);
    expect(result.body[0].address).toBe(
      "Unnamed Road, Kyivs'ka oblast, Ukraine"
    );
    expect(result.body[0].coordinates).toEqual({
      lat: 49.999137,
      lon: 30.0019538
    });
  });

  it('should response the GET method', async () => {
    const result = await simulate.get('/v1/geolocation/444/444', 200);
    expect(result.body.error).toBe('Error');
    expect(result.body.message).toBe('Response status code is 400');
  });
});
