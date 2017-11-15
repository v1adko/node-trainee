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
}

export default new JwtService();
