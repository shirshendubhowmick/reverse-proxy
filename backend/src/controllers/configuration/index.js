const { httpStatusCodes } = require('../../constants');
const cache = require('../../cache/index');

const configController = (req, res) => {
  let body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  });

  req.on('end', () => {
    body = Buffer.concat(body).toString();
    try {
      const configData = JSON.parse(body);
      const keys = Object.keys(configData);
      cache.set(`ORG`, configData[keys[0]]);
      res.writeHeader(httpStatusCodes.NO_CONTENT, {
        'content-type': 'application/JSON',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
      }).end();
    } catch (err) {
      res.writeHeader(httpStatusCodes.BAD_REQUEST, {
        'content-type': 'application/JSON',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
      }).end(JSON.stringify({ error: 'Unable to parse data, check payload' }));
    }
  });

  req.on('error', () => {
    res.writeHeader(httpStatusCodes.INTERNAL_SERVER_ERROR, {
      'content-type': 'application/JSON',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
    }).end(JSON.stringify({ error: 'INTERNAL_ERROR' }));
  });
};

module.exports = configController;
