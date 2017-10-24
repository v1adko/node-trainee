let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let secret = require('../config/db').secretTokkenWord;

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password) {
  this.salt = bcrypt.genSaltSync(10);
  this.hash = bcrypt.hashSync(password, this.salt);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.hash);
};

userSchema.methods.generateJwt = function() {
  return jwt.sign({
    _id: this._id,
    username: escape(this.username),
    exp: parseInt((Date.now() + 2 * 60 * 60 * 1000)), //token lifetime = 2hr
    // exp: parseInt((Date.now() + 10*1000)),
  }, secret);
};

mongoose.model('User', userSchema);