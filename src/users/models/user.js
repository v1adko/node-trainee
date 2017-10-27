const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = require('../config/db').secretTokkenWord;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function setPassword (password) {
  this.salt = bcrypt.genSaltSync(10);
  this.hash = bcrypt.hashSync(password, this.salt);
};

userSchema.methods.validPassword = function validPassword (password) {
  return bcrypt.compareSync(password, this.hash);
};

userSchema.methods.generateJwt = function generateJwt () {
  return jwt.sign({
    id: this.id,
    username: escape(this.username),
    exp: parseInt((Date.now() + 2 * 60 * 60 * 1000), 10) // token lifetime = 2hr
    // exp: parseInt((Date.now() + 10*1000)),
  }, secret);
};

mongoose.model('User', userSchema);
