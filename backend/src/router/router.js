const url = require('url');

const proxyController = require('../controllers/proxy');
const errorHandlers = require('../controllers/error');
const configController = require('../controllers/configuration');
const preFlightRequest = require('../controllers/preFlightRequest');

const routes = [
  {
    pathname: '/proxy',
    controller: proxyController,
    allowedMethods: [],
  },
  {
    pathname: '/config',
    controller: configController,
    allowedMethods: ['PATCH'],
  },
  {
    pathname: '/config',
    controller: preFlightRequest,
    allowedMethods: ['OPTIONS'],
  },
];

const router = (req, res) => {
  const reqURL = url.parse(req.url, true);
  let matchFound = false;
  for (let i = 0; i < routes.length; i += 1) {
    if (reqURL.pathname.startsWith(routes[i].pathname)
    && (!routes[i].allowedMethods.length || routes[i].allowedMethods.includes(req.method))) {
      matchFound = true;
      routes[i].controller(req, res);
      break;
    }
  }
  if (!matchFound) {
    errorHandlers(req, res);
  }
};

module.exports = router;
