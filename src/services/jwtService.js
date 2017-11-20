import jwt from 'jsonwebtoken';
import configJwt from '../config/jwt';

const { secretTokenWord: secret } = configJwt;

const options = {
  expiresIn: '2h'
};

class JwtService {
  generateJwt = (user, role) => {
    const payload = {
      _id: user._id,
      role
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
