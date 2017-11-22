import supertest from 'supertest';
import app from '../../app';

class RequestHelper {
  constructor(request, application) {
    this.request = request(application);
  }

  post(url, code, obj, token) {
    const setting = this.request
      .post(url)
      .type('form')
      .send(obj)
      .set('Accept', /application\/json/);
    if (token) {
      setting.set('x-access-token', token || null);
    }

    return setting.expect(code);
  }

  put(url, code, obj, token) {
    const setting = this.request
      .put(url)
      .type('form')
      .send(obj)
      .set('Accept', /application\/json/);
    if (token) {
      setting.set('x-access-token', token || null);
    }
    return setting.expect(code);
  }

  get(url, code, token) {
    const setting = this.request.get(url);
    if (token) {
      setting.set('x-access-token', token || null);
    }
    return setting.expect('Content-Type', /json/).expect(code);
  }
}

export default new RequestHelper(supertest, app);
