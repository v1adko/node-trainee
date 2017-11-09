const bcrypt = require('bcryptjs');

class PasswordService {
  static set(user, password) {
    const changedUser = user;
    changedUser.salt = bcrypt.genSaltSync(10);
    changedUser.hash = bcrypt.hashSync(password, user.salt);
    return changedUser;
  }

  static valid(user, password) {
    return bcrypt.compareSync(password, user.hash);
  }

  static change(user, password, newPassword) {
    if (PasswordService.valid(user, password)) {
      return PasswordService.set(user, newPassword);
    } throw new Error('Password is wrong');
  }
}

module.exports = PasswordService;
