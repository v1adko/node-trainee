const jwt = require('jsonwebtoken');

const { secretTokenWord: secret } = require('../../../config/jwt');

class JwtService {
  constructor(user, permissions) {
    this.user = user;
    this.permissions = permissions;
  }

  generateJwt() {
    const payload = {
      _id: this.user._id,
      permissions: Object.values(this.permissions)
    };
    const options = {
      expiresIn: '2h'
    };

    return jwt.sign(payload, secret, options);
  }
}

module.exports = JwtService;

