const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const { secretTokkenWord: secret } = require('../config/jwt');

function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  const promise = new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(new Error('Failed to authenticate token.'));
      } else {
        resolve(decoded);
      }
    });
  });

  promise
    .then((decoded) => {
      req.user = { id: decoded._id, permissions: decoded.permissions };
    })
    .catch((err) => {
      res.status(500).send({ auth: false, message: err.message });
    })
    .then(() => {
      next();
    });

  return null;
}

module.exports = verifyToken;
