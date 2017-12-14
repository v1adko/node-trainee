import parseArgvFlags from '../lib/parse-argv-flags';

export { default as jwt } from './jwt';
export { default as winstonConfig } from './winston';

export const port = process.env.PORT || 8080;
export const connectionDBString =
  process.env.DB_STRING_CONNECTION || 'mongodb://localhost/test_calendarDB';
export const morganConfig =
  process.env.NODE_ENV === 'development' ? 'dev' : () => {};
export const flags = parseArgvFlags();
