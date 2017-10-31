const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = require('../../config/jwt').secretTokkenWord;

const userMethods = {
  methods: {
    setPassword(password) {
      this.salt = bcrypt.genSaltSync(10);
      this.hash = bcrypt.hashSync(password, this.salt);
    },

    validPassword(password) {
      return bcrypt.compareSync(password, this.hash);
    },

    generateJwt() {
      return jwt.sign({
        _id: this._id,
        username: escape(this.username),
        exp: parseInt((Date.now() + (2 * 60 * 60 * 1000)) / 1000, 10) // token lifetime = 2hr
        // exp: parseInt((Date.now() + 10*1000)),
      }, secret);
    },


    getSafeUser() {
      const safeUser = {
        _id: this._id,
        username: this.username
      };
      return safeUser;
    }
  },

  statics: {
    verifyJwt(token, callback) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return callback({
            verified: false,
            message: 'Failed to authenticate token.'
          });
        }
        let status;

        if (decoded.exp > decoded.iat) {
          status = {
            verified: true,
            message: decoded
          };
        } else {
          status = {
            verified: false,
            message: 'Failed token exp.'
          };
        }
        return callback(status);
      });
    }
  }

};

module.exports = userMethods;
