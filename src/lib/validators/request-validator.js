import Joi from 'joi';
import { RequestValidationError } from '../errors';

async function requestValidator(validationRules, request) {
  const { body } = request;
  if (!validationRules) {
    return;
  }

  try {
    await Joi.validate(body, validationRules);
  } catch (error) {
    if (error.isJoi && error.name === 'ValidationError') {
      throw new RequestValidationError(error.details[0].message);
    }
    throw error;
  }
}

export default requestValidator;
