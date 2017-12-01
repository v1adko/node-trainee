import startApp from './start-app';
import logger from './utils/logger';

startApp().catch((err) => {
  logger.error(err);
  process.kill(1);
});
