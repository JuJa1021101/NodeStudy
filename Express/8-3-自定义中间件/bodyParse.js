const qs = require('querystringify');

const middleware = (req, res, next) => {
  let mes = '';
  req.on('data', (val) => {
    mes += val;
  });
  req.on('end', () => {
    req.body = qs.parse(mes);
    next();
  });
};

module.exports = middleware;