const axios = require('axios');

const APICallInstance = axios.create({
});

/**
 * requestHandler is a wrapper over axios instance, used firing network request with credentials
 * @param {string} verb HTTP verb for the request, supported verb GET, POST
 * @param {string} url URL to fire the request
 * @param {Object} [data] data for request body, optional
 * @param {Object} [headers] Optional headers
 * @returns {Promise} Promise from axios call
 */
const requestHandler = (verb, url, data, headers) => {
  switch (verb) {
    case 'GET':
      return APICallInstance.get(url, {
        headers: {
          ...headers,
        },
      });
    case 'POST':
      return APICallInstance.post(url, data, {
        headers: {
          ...headers,
        },
      });
    case 'PATCH':
      return APICallInstance.patch(url, data, {
        headers: {
          ...headers,
        },
      });
    default: throw Error('Invalid HTTP verb');
  }
};

module.exports = {
  requestHandler,
};
