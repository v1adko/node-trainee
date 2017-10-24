let http = require('http');
let port = process.env.PORT || 8080;

let app = require('./src/app');

let server = http.createServer(app);
server.listen(port);
console.log("App listening on port" + port);