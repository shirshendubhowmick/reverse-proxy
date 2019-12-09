const { httpStatusCodes } = require('../../constants');

const preFlightRequest = (req, res) => {
  res.writeHeader(httpStatusCodes.OK, {
    'content-type': 'application/JSON',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*',
  }).end();
};

module.exports = preFlightRequest;
