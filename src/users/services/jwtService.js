import jwt from 'jsonwebtoken';

import { secretTokkenWord as secret } from '../config/jwt';

import permissionsConst from '../config/permissions';

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
