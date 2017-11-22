import jwt from 'jsonwebtoken';
import configJwt from '../config/jwt';

const { tokenSecret: secret, tokenExpiresIn: expiresIn } = configJwt;

const options = { expiresIn };

class JwtService {
  generateJwt = (user) => {
    const payload = {
      _id: user._id,
      role: user.role
    };
    return jwt.sign(payload, secret, options);
  };

  decoder = (token) => {
    const promise = new Promise((resolve, reject) => {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          reject(new Error('Failed to authenticate token.'));
        } else {
          resolve(decoded);
        }
      });
    });
    return promise;
  };
}

export default new JwtService();
