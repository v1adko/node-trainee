import http from 'http';

import db from './db';
import { port } from './config';
import app from './app';

async function startApp() {
  const server = http.createServer(app);

  const connection = db.getConnection();
  // TODO: handle error
  server.listen(port);
  console.log(`App listening on port ${port}`);

  server.on('close', () => {
    connection.close();
  });

  return server;
}

export default startApp;
