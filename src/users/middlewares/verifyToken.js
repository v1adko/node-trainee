import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens
import configJwt from '../config/jwt';

const { secretTokkenWord: secret } = configJwt;

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
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(500).send({ auth: false, message: err.message });
    });

  return null;
}

export default verifyToken;
