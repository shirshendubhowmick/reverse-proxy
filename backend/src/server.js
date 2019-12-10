const http = require('http');

const router = require('./router/router');

const host = '0.0.0.0';
const { PORT } = process.env;

const server = http.createServer((req, res) => {
  router(req, res);
});

server.listen(PORT, host, () => {
  console.log(`Reverse proxy server listening on port ${PORT}`);
});
