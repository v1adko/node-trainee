import winston from 'winston';
import { winstonConfig } from '../config/index';

const logger = new winston.Logger({
  transports: [new winston.transports.Console(winstonConfig.consoleOptions)]
});

export default logger;
