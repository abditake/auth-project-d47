'use strict';

function handle500(err, req, res, next) {
  const error = err.message ? err.message : err;
  res.status(500).send(error);
}

module.exports = handle500;
