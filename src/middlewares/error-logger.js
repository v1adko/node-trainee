import logger from '../lib/logger';
import BaseHttpError from '../lib/errors/base-http-error';

// NOTE: It's only stub for logger

// TODO: Should write non custom error in log file.
//       After that developer use information from log file for writing new errors class.
const errorLogger = (error, request, response, next) => {
  if (error instanceof BaseHttpError) {
    return next();
  }

  logger.error(error);
  return next();
};

export default errorLogger;
