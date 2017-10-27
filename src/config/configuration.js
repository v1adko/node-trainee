module.exports = {
  PORT: process.env.PORT || 8080,
  connectionDBString: process.env.mongoConDBStr || 'mongodb://localhost/calendarDB',
  envStatus: process.env.status || 'dev'
};
