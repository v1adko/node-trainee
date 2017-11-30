import supertest from 'supertest';
import app from '../../app';
import HTTP_METHODS from '../../constants/httpMethods';

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

  get = (url, code, token) =>
    this.factory(HTTP_METHODS.GET, url, code, null, token);
  post = (...params) => this.factory(HTTP_METHODS.POST, ...params);
  put = (...params) => this.factory(HTTP_METHODS.PUT, ...params);
  delete = (...params) => this.factory(HTTP_METHODS.DELETE, ...params);
}

export default new RequestHelper(supertest, app);
