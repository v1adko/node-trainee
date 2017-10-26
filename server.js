<<<<<<< d76684fbb68da31279889cfa465147047b2e9006
const http = require('http');
const app = require('./src/app');
const config = require('./src/config/configuration');
=======
let http = require('http');
let config = require('./src/config/configuration');
let port = process.env.PORT || config.PORT || 8080;
>>>>>>> done dao get

const port = process.env.PORT || config.PORT || 8080;


const server = http.createServer(app);
server.listen(port);
console.log(`App listening on port ${port}`);
