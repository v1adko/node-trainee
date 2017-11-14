import http from 'http';
import app from './app';

import config from './config';

const { port } = config;

const server = http.createServer(app);
server.listen(port);
console.log(`App listening on port ${port}`);
