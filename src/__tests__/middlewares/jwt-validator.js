import jwt from 'jsonwebtoken';
import jwtValidator from '../../middlewares/jwt-validator';
import configJwt from '../../config/jwt';

const { tokenSecret: secret, tokenExpiresIn: expiresIn } = configJwt;
const options = { expiresIn };

let counter = 0;

const request = { headers: {} };

describe('Test jwt validator', () => {
  beforeEach(() => {
    counter = 0;
  });

  it('should not write in request user field, because token is missing', async () => {
    await jwtValidator(request, null, () => {
      counter += 1;
    });

    expect(counter).toBe(1);
    expect(request.user).toBeUndefined();
  });

  it('should pass in "next" error, because token is invalid', async () => {
    request.headers.access_token = 'token';

    const validationWithError = () =>
      jwtValidator(request, null, (error) => {
        throw error;
      });

    expect(request.user).toBeUndefined();
    expect(validationWithError()).rejects.toMatchSnapshot();
  });

  it('should return user data', async () => {
    const payload = {
      testField: 'test id'
    };
    const token = jwt.sign(payload, secret, options);

    request.headers.access_token = token;

    await jwtValidator(request, null, () => {
      counter += 1;
    });

    expect(counter).toBe(1);
    expect(request.user.testField).toBe(payload.testField);
  });
});
