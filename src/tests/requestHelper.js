const supertest = require('supertest');
const app = require('../app');

class RequestHelper {
  constructor(request, application) {
    this.request = request(application);
  }

  post(url, code, obj, done) {
    return this.request
      .post(url)
      .type('form')
      .send(obj)
      .set('Accept', /application\/json/)
      .expect(code)
      .expect(done);
  }

  get(url, code, done) {
    return this.request
      .get(url)
      .expect('Content-Type', /json/)
      .expect(code)
      .expect(done);
  }
}

module.exports = new RequestHelper(supertest, app);
