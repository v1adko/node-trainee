import errorSender from '../../middlewares/error-sender';

class ResponseMock {
  status(code) {
    this.code = code;
    return this;
  }

  json(responseObject) {
    this.responseObject = responseObject;
    return this;
  }
}

let counter = 0;

describe('Test error sender', () => {
  beforeEach(() => {
    counter = 0;
  });

  it('should send common respoce object', () => {
    const error = new Error('test error message');
    const responce = new ResponseMock();
    errorSender(error, null, responce, () => {
      counter += 1;
    });
    const { responseObject, code } = responce;

    expect(counter).toBe(1);
    expect(code).toBe(500);
    expect(responseObject).toMatchSnapshot();
  });
});
