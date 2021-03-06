import http from 'http';

import db from './db';
import { port } from './config';
import app from './app';
import logger from './lib/logger';

async function startApp() {
  const server = http.createServer(app);

  server.listen(port);
  logger.info(`App listening on port ${port}`);

  server.on('close', async () => {
    db.closeConnection();
  });

  return server;
}

export default startApp;
