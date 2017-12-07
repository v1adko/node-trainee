import logger from '../lib/logger';
import * as errors from '../lib/errors';

const checkCustomError = error =>
  Object.keys(errors).indexOf(error.name) !== -1;

// TODO: Should write non custom error in log file.
//       After that developer use information from log file for writing new errors class.
const errorLogger = (error, request, response, next) => {
  if (checkCustomError(error)) {
    return next();
  }

  logger.error(error);
  return next();
};

export default errorLogger;
