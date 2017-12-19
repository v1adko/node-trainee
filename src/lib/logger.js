const winston = require('winston');
const { winstonConfig } = require('../config/index');

const logger = new winston.Logger({
  transports: [new winston.transports.Console(winstonConfig.consoleOptions)]
});

module.exports = logger;
