import supertest from 'supertest';
import app from '../../app';

class RequestHelper {
  constructor(request, application) {
    this.request = request(application);
  }

  factory(method, url, code, obj, token) {
    const setting = this.request[method](url)
      .type('form')
      .send(obj)
      .set('Accept', /application\/json/);
    if (token) {
      setting.set('x-access-token', token || null);
    }

    return setting.expect(code);
  }

  get = (url, code, token) => this.factory('get', url, code, null, token);
  post = (...args) => this.factory('post', ...args);
  put = (...args) => this.factory('put', ...args);
  delete = (...args) => this.factory('delete', ...args);
}

export default new RequestHelper(supertest, app);
