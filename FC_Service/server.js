const http = require('http');

const app = require('./app');

const port  = process.env.PORT || 5052;

const server = http.createServer(app);

server.listen(port,()=>console.log("FC Service listening on port " + port));