const proxyService = require('../../services/proxyService');

const porxyURLRegex = /^\/proxy(\/)?/;

const proxyController = (req, res) => {
  let body = [];

  req.on('data', (chunk) => {
    body.push(chunk);
  });
  req.on('end', () => {
    body = Buffer.concat(body).toString();
    const { method, url, headers } = req;
    delete headers.host;
    const options = {
      url: `http://api-local.zettaschool.com${url.replace(porxyURLRegex, '/')}`,
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
