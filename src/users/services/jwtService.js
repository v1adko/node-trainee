import jwt from 'jsonwebtoken';
import configJwt from '../config/jwt';
import permissionsConst from '../config/permissions';

const { secretTokkenWord: secret } = configJwt;

class JwtService {
  generateJwt = (user) => {
    const payload = {
      _id: user._id,
      permissions: Object.values(permissionsConst)
    };
    const options = {
      expiresIn: '2h'
    };

    return jwt.sign(payload, secret, options);
  }
}

export default new JwtService();
