const { requestHandler } = require('../networkService');
const { httpStatusCodes } = require('../../constants');

const proxyService = async (options, payload, successCallback) => {
  try {
    const response = await requestHandler(options.method, options.url, payload, options.headers);
    successCallback(response);
  } catch (err) {
    console.log(err);
    successCallback(err.response || {
      headers: {
        'x-proxy-status': 'miss from proxy',
        'content-type': 'application/JSON',
      },
      status: httpStatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        error: 'Unbale to reach destination server',
      },
    });
  }
};

module.exports = proxyService;
