const parseArgvFlags = require('../lib/parse-argv-flags');

module.exports.jwt = require('./jwt');

module.exports.winstonConfig = require('./winston');

module.exports.port = process.env.PORT || 8080;
module.exports.connectionDBString =
  process.env.DB_STRING_CONNECTION || 'mongodb://localhost/test_calendarDB';
module.exports.morganConfig =
  process.env.NODE_ENV === 'development' ? 'dev' : () => {};
module.exports.flags = parseArgvFlags();
