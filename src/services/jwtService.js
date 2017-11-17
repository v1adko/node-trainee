import jwt from 'jsonwebtoken';
import configJwt from '../config/jwt';
import { TokenValidationError } from '../errors';

const { tokenSecret: secret, tokenExpiresIn: expiresIn } = configJwt;

const options = { expiresIn };

class JwtService {
  generateJwt = (user, permissions) => {
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
          reject(new TokenValidationError());
        } else {
          resolve(decoded);
        }
      });
    });
    return promise;
  };
}

export default new JwtService();
