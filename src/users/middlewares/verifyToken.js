import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens
import configJwt from '../config/jwt';

const { secretTokenWord: secret } = configJwt;

function verifyToken(request, response, next) {
  const token = request.headers['x-access-token'];
  if (!token) {
    return response
      .status(403)
      .send({ auth: false, message: 'No token provided.' });
  }

  const promise = new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        reject(new Error('Failed to authenticate token.'));
      } else {
        resolve(decoded);
      }
    });
  });

  promise
    .then((decoded) => {
      request.user = { id: decoded._id, permissions: decoded.permissions };
    })
    .then(() => {
      next();
    })
    .catch(error =>
      response.status(500).send({ auth: false, message: error.message })
    );

  return null;
}

export default verifyToken;
