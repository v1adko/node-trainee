const http = require('http');
const app = require('./src/app');
const config = require('./src/config/configuration');

const port = process.env.PORT || config.PORT || 8080;


const server = http.createServer(app);
server.listen(port);
console.log(`App listening on port ${port}`);
