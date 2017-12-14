import Joi from 'joi';
import requestValidator from '../../../lib/validators/request-validator';

const testSchemaValidation = Joi.string()
  .alphanum()
  .required();

const methodValidationRules = {
  testField: testSchemaValidation
};

const request = {
  data: { testField: 'testTextForField' }
};
describe('Test request validator', async () => {
  it('should request field and pass it, because they are valid', async () => {
    await requestValidator(methodValidationRules, request);
  });

  it('should pass all requests, because rules for method does not exist ', async () => {
    await requestValidator(null, request);
  });

  it('should return RequestValidationError, because request data contain non alphanum characters', async () => {
    const invalidRequest = {
      data: { testField: 'test text for field' }
    };
    expect(
      requestValidator(methodValidationRules, invalidRequest)
    ).rejects.toMatchSnapshot();
  });

  it('should return RequestValidationError, because request data contain non alphanum characters 2', async () => {
    const data = { testField: 'testTextForField' };
    Object.defineProperty(data, 'testField', {
      get() {
        throw new Error('test error');
      }
    });
    const thowingRequest = { data };

    expect(
      requestValidator(methodValidationRules, thowingRequest)
    ).rejects.toMatchSnapshot();
  });
});
