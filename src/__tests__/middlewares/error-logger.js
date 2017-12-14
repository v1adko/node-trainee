import errorLogger from '../../middlewares/error-logger';
import NotFoundError from '../../lib/errors/not-found-error';

let counter = 0;

describe('Test error logger', () => {
  beforeEach(() => {
    counter = 0;
  });

  it('should write in log test error', () => {
    const error = new Error('test error message');
    errorLogger(error, null, null, () => {
      counter += 1;
    });
    expect(counter).toBe(1);
  });

  it('should not write in log custom error', () => {
    const error = new NotFoundError('test error message');
    errorLogger(error, null, null, () => {
      counter += 1;
    });
    expect(counter).toBe(1);
  });
});
