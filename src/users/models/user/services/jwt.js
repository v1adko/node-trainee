const jwt = require('jsonwebtoken');

const { secretTokkenWord: secret } = require('../../../config/jwt');

const permissions = require('../../../config/permissions');

function generateJwt() {
  const payload = {
    _id: this._id,
    permissions: Object.values(permissions) // Gives all permissions
  };
  const options = {
    expiresIn: '2h'
  };

  return jwt.sign(payload, secret, options);
}

module.exports = {
  generateJwt
};

