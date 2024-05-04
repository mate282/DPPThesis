const http = require('http');

const app = require('./app');

const port  = process.env.PORT || 5051;

const server = http.createServer(app);

server.listen(port,()=>console.log("DPP Service listening on port " + port));