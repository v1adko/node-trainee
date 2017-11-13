const bcrypt = require('bcryptjs');

class PasswordService {
  constructor() {
    this.set = (user, password) => {
      const changedUser = user;
      changedUser.salt = bcrypt.genSaltSync(10);
      changedUser.hash = bcrypt.hashSync(password, user.salt);
      return changedUser;
    };

    this.valid = (user, password) => bcrypt.compareSync(password, user.hash);

    this.change = (user, password, newPassword) => {
      if (this.valid(user, password)) {
        return this.set(user, newPassword);
      } throw new Error('Password is wrong');
    };
  }
}

module.exports = new PasswordService();
