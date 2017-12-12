import jwt from 'jsonwebtoken';
import configJwt from '../../config/jwt';
import { AuthorizationError } from '../../lib/errors';

const { tokenSecret: secret, tokenExpiresIn: expiresIn } = configJwt;

const options = { expiresIn };

class JwtService {
  generateJwt = (user) => {
    const payload = {
      id: user.id,
      role: user.role
    };
    return jwt.sign(payload, secret, options);
  };

  decoder = (token) => {
    const promise = new Promise((resolve, reject) => {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          reject(
            new AuthorizationError(
              'Invalid token, please repeat authentication.'
            )
          );
        } else {
          resolve(decoded);
        }
      });
    });
    return promise;
  };
}

export default new JwtService();
