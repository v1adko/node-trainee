const bcrypt = require('bcryptjs');

class PasswordService {
  constructor(user) {
    this.user = user;
  }

  set(password) {
    this.user.salt = bcrypt.genSaltSync(10);
    this.user.hash = bcrypt.hashSync(password, this.user.salt);
  }

  valid(password) {
    return bcrypt.compareSync(password, this.user.hash);
  }

  change(password, newPassword) {
    if (this.user.password.valid(password)) {
      this.user.password.set(newPassword);
      return this.user;
    } throw new Error('Password is wrong');
  }
}

module.exports = PasswordService;
