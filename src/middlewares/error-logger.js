import logger from '../lib/logger';

// NOTE: It's only stub for logger

// TODO: Should write non custom error in log file.
//       After that developer use information from log file for writing new errors class.
const errorLogger = (error, request, response, next) => {
  logger.error('↓'.repeat(error.message.length));
  logger.error(error);
  logger.error('↑'.repeat(error.message.length));
  next();
};

export default errorLogger;
