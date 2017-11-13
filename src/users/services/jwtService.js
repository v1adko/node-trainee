const jwt = require('jsonwebtoken');

const { secretTokkenWord: secret } = require('../config/jwt');

const permissionsConst = require('../config/permissions');

class JwtService {
  constructor() {
    this.generateJwt = (user) => {
      const payload = {
        _id: user._id,
        permissions: Object.values(permissionsConst)
      };
      const options = {
        expiresIn: '2h'
      };

      return jwt.sign(payload, secret, options);
    };
  }
}

module.exports = new JwtService();
