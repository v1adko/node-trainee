import jwt from 'jsonwebtoken';
import configJwt from '../config/jwt';
import permissionsConst from '../config/permissions';

const { secretTokenWord: secret } = configJwt;

const options = {
  expiresIn: '2h'
};

const permissions = Object.values(permissionsConst);

class JwtService {
  generateJwt = (user) => {
    const payload = {
      _id: user._id,
      permissions
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
