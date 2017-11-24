import parseArgvFlags from './parseArgvFlags';
import jwtConfig from './jwt';

export const port = process.env.PORT || 8080;
export const connectionDBString =
  process.env.DB_STRING_CONNECTION || 'mongodb://localhost/calendarDB';
export const morganConfig = process.env.NODE_ENV === 'development' ? 'dev' : '';
export const flags = parseArgvFlags();
export const jwt = jwtConfig;
