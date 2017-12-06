import logger from '../lib/logger';
import { RequestValidationError } from '../lib/errors';
import { flags } from '../config';

// NOTE: It's only stub for logger

// TODO: Should write non custom error in log file.
//       After that developer use information from log file for writing new errors class.
const errorLogger = (error, request, response, next) => {
  if (error.name === RequestValidationError.name) {
    return next();
  }
  if (flags.debug) {
    logger.error(error);
  }
  return next();
};

export default errorLogger;
