const { requestHandler } = require('../networkService');

const proxyService = async (options, payload, successCallback) => {
  console.log(options);
  try {
    const response = await requestHandler(options.method, options.url, payload, options.headers);
    successCallback(response);
  } catch (err) {
    console.log(err);
    successCallback(err.response);
  }
};

module.exports = proxyService;
