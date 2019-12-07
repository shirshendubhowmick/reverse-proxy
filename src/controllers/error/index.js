const { setDefaultHeaders } = require('../../utils');
const { httpStatusCodes } = require('../../constants');

const notFoundController = (req, res) => {
  setDefaultHeaders(req, res);
  res.statusCode = httpStatusCodes.NOT_FOUND;
  res.end(JSON.stringify({
    errors: [
      {
        title: 'Resource not found',
      },
    ],
  }));
};

module.exports = notFoundController;
