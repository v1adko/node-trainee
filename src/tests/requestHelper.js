const supertest = require('supertest');
const app = require('../app');

class RequestHelper {
  constructor(request, application) {
    this.request = request(application);
  }

  post(url, code, obj) {
    return this.request
      .post(url)
      .type('form')
      .send(obj)
      .set('Accept', /application\/json/)
      .expect(code);
  }

  get(url, code) {
    return this.request
      .get(url)
      .expect('Content-Type', /json/)
      .expect(code);
  }
}

module.exports = new RequestHelper(supertest, app);
