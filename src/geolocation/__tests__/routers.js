const request = require('supertest');
const app = require('../../app');

const testValidRequest = (path, expected) =>
  request(app)
    .get(path)
    .expect('Content-Type', /json/)
    .expect(200, expected);

describe('Test the "/geolocation/:location" path', () => {
  test('It should response the GET method', () =>
    testValidRequest(
      '/geolocation/kharkiv',
      [{ address: 'Kharkiv, Kharkiv Oblast, Ukraine', lat: 49.9935, lon: 36.230383 }]
    ));

  test('It should response the GET method', () =>
    testValidRequest(
      '/geolocation/50fasdfasdf3fd32d',
      { message: 'Entered address does not have any matches' }
    ));
});

describe('Test the "/geolocation/:lat/:lon" path', () => {
  test('It should response the GET method', () =>
    testValidRequest(
      '/geolocation/50/30',
      { address: "Unnamed Road, Kyivs'ka oblast, Ukraine" }
    ));

  test('It should response the GET method', () =>
    testValidRequest(
      '/geolocation/444/444',
      { message: 'Response status code is 400' }
    ));
});
