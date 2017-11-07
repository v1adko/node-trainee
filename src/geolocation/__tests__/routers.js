const request = require('supertest');
const app = require('../../app');

describe('Test the "/geolocation/:location" path', () => {
  test('It should response the GET method', () =>
    request(app)
      .get('/geolocation/kharkiv')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '33')
      .expect(200, [{ lat: 49.9935, lon: 36.230383 }]));

  test('It should response the GET method', () =>
    request(app)
      .get('/geolocation/50fasdfasdf3fd32d')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '36')
      .expect(200, { message: "Dos't have any matches" }));
});

describe('Test the "/geolocation/:lat/:lon" path', () => {
  test('It should response the GET method', () =>
    request(app)
      .get('/geolocation/50/30')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '52')
      .expect(200, { address: "Unnamed Road, Kyivs'ka oblast, Ukraine" }));

  test('It should response the GET method', () =>
    request(app)
      .get('/geolocation/444/444')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '41')
      .expect(200, { message: 'Response status code is 400' }));
});
