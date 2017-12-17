const parseArgvFlags = require('../lib/parse-argv-flags');
const jwt = require('./jwt');
const winstonConfig = require('./winston');

const port = process.env.PORT || 8080;
const connectionDBString =
  process.env.DB_STRING_CONNECTION || 'mongodb://localhost/test_calendarDB';
const morganConfig = process.env.NODE_ENV === 'development' ? 'dev' : () => {};
const flags = parseArgvFlags();

module.exports = {
  jwt,
  winstonConfig,
  port,
  connectionDBString,
  morganConfig,
  flags
};
