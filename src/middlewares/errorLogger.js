import logger from '../utils/logger';

// NOTE: It's only stub for logger

// TODO: Should write non custom error in log file.
//       After that developer use log file for writing new errors class.
const errorLogger = (error, requset, response, next) => {
  logger.error('↓'.repeat(error.message.length));
  logger.error(error.message);
  logger.error('↑'.repeat(error.message.length));
  next();
};

export default errorLogger;
