import supertest from 'supertest';
import app from '../../app';

class RequestHelper {
  constructor(request, application) {
    this.request = request(application);
  }

  post(url, code, obj, token) {
    return this.request
      .post(url)
      .type('form')
      .send(obj)
      .set('Accept', /application\/json/)
      .set('x-access-token', token || null)
      .expect(code);
  }

  put(url, code, obj, token) {
    return this.request
      .put(url)
      .type('form')
      .send(obj)
      .set('Accept', /application\/json/)
      .set('x-access-token', token || null)
      .expect(code);
  }

  get(url, code, token) {
    return this.request
      .get(url)
      .expect('Content-Type', /json/)
      .set('x-access-token', token || null)
      .expect(code);
  }
}

export default new RequestHelper(supertest, app);
