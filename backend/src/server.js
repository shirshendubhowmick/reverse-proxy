const http = require('http');

const router = require('./router/router');

const host = 'localhost';
const { PORT } = process.env;

const server = http.createServer((req, res) => {
  router(req, res);
});

server.listen(PORT, host, () => {
  console.log(`Reverse proxy server listening on port ${PORT}`);
});
