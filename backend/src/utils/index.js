const setDefaultHeaders = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
};

module.exports = {
  setDefaultHeaders,
};
