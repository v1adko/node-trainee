import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

class PasswordService {
  set = (user, password) => {
    const changedUser = user;
    changedUser.salt = genSaltSync(10);
    changedUser.hash = hashSync(password, user.salt);
    return changedUser;
  }

  valid = (user, password) => compareSync(password, user.hash)

  change = (user, password, newPassword) => {
    if (this.valid(user, password)) {
      return this.set(user, newPassword);
    } throw new Error('Password is wrong');
  }
}

export default new PasswordService();
