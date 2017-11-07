const bcrypt = require('bcryptjs');

function setPassword(password) {
  this.salt = bcrypt.genSaltSync(10);
  this.hash = bcrypt.hashSync(password, this.salt);
}

function validPassword(password) {
  return bcrypt.compareSync(password, this.hash);
}

function changePassword(password, newPassword) {
  if (this.validPassword(password)) {
    this.setPassword(newPassword);
    return this;
  } throw new Error('Password is wrong');
}

module.exports = {
  setPassword,
  validPassword,
  changePassword
};
