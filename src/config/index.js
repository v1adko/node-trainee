import parseArgvFlags from './parseArgvFlags';
import jwtConfig from './jwt';

const config = {
  port: process.env.PORT || 8080,
  connectionDBString:
    process.env.DB_STRING_CONNECTION || 'mongodb://localhost/calendarDB',
  morganConfig: process.env.NODE_ENV === 'development' ? 'dev' : '',
  flags: parseArgvFlags(),
  jwt: jwtConfig
};

export default config;
