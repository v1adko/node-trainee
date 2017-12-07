import BaseHttpError from '../lib/errors/base-http-error';

const throwAndCatchError = (error) => {
  try {
    throw error;
  } catch (catchedError) {
    return catchedError;
  }
};

describe('Test base class for all Http errors BaseHttpErrors', () => {
  it('should check inherit from ERROR', () => {
    const error = new BaseHttpError();

    expect(error instanceof Error).toBe(true);
    expect(error instanceof BaseHttpError).toBe(true);
  });

  it('should check standart behavior of error', () => {
    const baseError = new BaseHttpError();
    const error = throwAndCatchError(baseError);

    expect(error).toBe(baseError);
  });
});

class TestError extends BaseHttpError {
  constructor() {
    super('test message.', 500);
  }

  getResponseObject = () =>
    super.getResponseObject({ testResposeField: 'test text of field' });
}

describe('Test inherit for BaseHttpErrors', () => {
  it('should check inherit from BaseHttpErrors', () => {
    const error = new TestError();

    expect(error instanceof Error).toBe(true);
    expect(error instanceof BaseHttpError).toBe(true);
    expect(error instanceof TestError).toBe(true);
  });

  it('should check standart behavior of error', () => {
    const baseError = new TestError();
    const error = throwAndCatchError(baseError);

    expect(error).toBe(baseError);
    expect(error instanceof Error).toBe(true);
    expect(error instanceof BaseHttpError).toBe(true);
    expect(error instanceof TestError).toBe(true);
  });

  it('should return response object', () => {
    const baseError = new TestError();
    const responseObject = baseError.getResponseObject();

    expect(responseObject).toMatchSnapshot();
  });

  it('should check adding of messages', () => {
    const baseError = new TestError();
    const message1 = 'First dditiuonal test message of error.';
    const message2 = 'Second dditiuonal test message of error.';
    baseError.addMessage(message1);
    baseError.addMessage(message2);

    expect(baseError).toMatchSnapshot();
  });
});
