import Joi from 'joi';
import { RequestValidationError } from '../errors';

async function requestValidator(validationRules, request) {
  const { data } = request;

  if (!validationRules) {
    return null;
  }

  try {
    const validatedData = await Joi.validate(data, validationRules);
    return validatedData;
  } catch (error) {
    if (error.isJoi && error.name === 'ValidationError') {
      throw new RequestValidationError(error.details[0].message);
    }
    throw error;
  }
}

export default requestValidator;
