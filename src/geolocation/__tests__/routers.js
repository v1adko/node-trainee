const simulate = require('../../tests/requestHelper');

describe('Test the "/geolocation/:location" path', () => {
  test('It should response the GET method', async () => {
    await
    simulate.get(
      '/geolocation/kharkiv',
      200,
      [{
        address: 'Kharkiv, Kharkiv Oblast, Ukraine',
        coordinations: { lat: 49.9935, lon: 36.230383 }
      }]
    );
  });

  test('It should response the GET method', async () => {
    await
    simulate.get(
      '/geolocation/50fasdfasdf3fd32d',
      200,
      { message: 'Entered address does not have any matches' }
    );
  });
});

describe('Test the "/geolocation/:lat/:lon" path', () => {
  test('It should response the GET method', async () => {
    await
    simulate.get(
      '/geolocation/50/30',
      200,
      [{
        address: "Unnamed Road, Kyivs'ka oblast, Ukraine",
        coordinations: { lat: 49.999137, lon: 30.0019538 }
      }]
    );
  });

  test('It should response the GET method', async () => {
    await
    simulate.get(
      '/geolocation/444/444',
      200,
      { message: 'Response status code is 400' }
    );
  });
});
