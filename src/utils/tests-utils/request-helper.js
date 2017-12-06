import supertest from 'supertest';
import app from '../../app';
import HTTP_METHODS from '../../constants/http-methods';

class RequestHelper {
  constructor(request, application) {
    this.request = request(application);
  }

  async makeRequest(method, url, code, obj, token) {
    const setting = this.request[method](url)
      .type('form')
      .send(obj)
      .set('Accept', /application\/json/);
    if (token) {
      setting.set('access_token', token || null);
    }

    const result = await setting.expect(code);

    return result.body;
  }

  get = async (url, code, token) =>
    this.makeRequest(HTTP_METHODS.GET, url, code, null, token);
  post = async (...params) => this.makeRequest(HTTP_METHODS.POST, ...params);
  put = async (...params) => this.makeRequest(HTTP_METHODS.PUT, ...params);
  delete = async (...params) =>
    this.makeRequest(HTTP_METHODS.DELETE, ...params);
}

export default new RequestHelper(supertest, app);
