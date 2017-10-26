let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let secret = require('../config/jwt').secretTokkenWord;

let userMethods = {
  methods: {
    setPassword: function(password) {
      this.salt = bcrypt.genSaltSync(10);
      this.hash = bcrypt.hashSync(password, this.salt);
    },

    validPassword: function(password) {
      return bcrypt.compareSync(password, this.hash);
    },

    generateJwt: function() {
      return jwt.sign({
        _id: this._id,
        username: escape(this.username),
        exp: parseInt((Date.now() + 2 * 60 * 60 * 1000) / 1000), //token lifetime = 2hr
        // exp: parseInt((Date.now() + 10*1000)),
      }, secret);
    },


    getSafeUser: function() {
      let safeUser = {
        _id: this._id,
        username: this.username
      }
      return safeUser;
    }
  },

  statics: {
    verifyJwt: function(token, callback) {
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          return callback({
            verified: false,
            message: 'Failed to authenticate token.'
          });
        } else {
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
        }
      });
    },
  }

}

module.exports = userMethods;