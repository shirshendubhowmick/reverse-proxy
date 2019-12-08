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
    const source = headers.host;
    const destination = cache.get(`ORG_${source}`);
    if (!destination) {
      res.writeHeader(
        httpStatusCodes.BAD_REQUEST,
        { 'x-proxy-status': 'miss from proxy' },
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
        { ...response.headers, 'x-proxy-status': 'routed via proxy' },
      ).end(JSON.stringify(response.data));
    }, (err) => {
      console.log(err);
      res.end(err);
    });
  });
};

module.exports = proxyController;
