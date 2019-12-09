const proxyService = require('../../services/proxyService');
const cache = require('../../cache');
const { httpStatusCodes } = require('../../constants');


const porxyURLRegex = /^\/proxy(\/)?/;

const proxyController = (req, res) => {
  let body = [];

  req.on('data', (chunk) => {
    body.push(chunk);
  });
  req.on('end', () => {
    body = Buffer.concat(body).toString();
    const { method, url, headers } = req;
    const source = headers.origin;
    const destination = cache.get(`ORG_${source}`);
    if (!destination) {
      res.writeHeader(
        httpStatusCodes.BAD_REQUEST,
        {
          'x-proxy-status': 'miss from proxy',
          'content-type': 'application/JSON',
        },
      ).end(JSON.stringify({ error: 'Origin not registered' }));
      return;
    }

    delete headers.host;
    const options = {
      url: `${destination}${url.replace(porxyURLRegex, '/')}`,
      method,
      headers,
    };

    proxyService(options, body, (response) => {
      res.writeHeader(
        response.status,
        { 'x-proxy-status': 'routed via proxy', ...response.headers },
      ).end(response.headers['content-type'].toLowerCase().startsWith('application/json') ? JSON.stringify(response.data) : response.data);
    });
  });
};

module.exports = proxyController;
