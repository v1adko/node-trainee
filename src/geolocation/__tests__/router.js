const request = require('supertest');
const app = require('../../app');

describe('Test the "/geolocation/:location" path', () => {
  test('It should response the GET method', () => request(app).get('/geolocation/kharkiv').then((response) => {
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ lat: 49.9935, lon: 36.230383 }]);
  }));
});

describe('Test the "/geolocation/:lat/:lon" path', () => {
  test('It should response the GET method', () => request(app).get('/geolocation/50/30').then((response) => {
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ address: "Unnamed Road, Kyivs'ka oblast, Ukraine" });
  }));
});
