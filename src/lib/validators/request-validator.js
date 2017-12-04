import Joi from 'joi';
import { RequestValidationError } from '../errors';

async function requestValidator(validationRules, request) {
  const requestData = { ...request.body, ...request.params, ...request.query };
  // console.log('==============================');
  // console.log('params', request.params);
  // console.log('query', request.query);
  // console.log('body', request.body);
  // console.log('==============================');

  if (!validationRules) {
    return;
  }

  try {
    await Joi.validate(requestData, validationRules);
  } catch (error) {
    // console.log(error.details);
    if (error.isJoi && error.name === 'ValidationError') {
      throw new RequestValidationError(error.details[0].message);
    }
    throw error;
  }
}

export default requestValidator;
