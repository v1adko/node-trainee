const parseArgvFlags = require('./parseArgvFlags');

const config = {
  PORT: process.env.PORT || 8080,
  connectionDBString: process.env.mongoConDBStr || 'mongodb://localhost/calendarDB',
  morganConfig: (process.env.NODE_ENV === 'development' ? 'dev' : ''),
  flags: parseArgvFlags()
};

module.exports = config;
