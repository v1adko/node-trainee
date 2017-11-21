import { compareSync } from 'bcryptjs';

class PasswordService {
  valid = (user, password) => compareSync(password, user.hash);

  change = (user, password, newPassword) => {
    if (this.valid(user, password)) {
      const changedUser = user;
      changedUser.password = newPassword;
      return changedUser;
    }
    throw new Error('Password is wrong');
  };
}

export default new PasswordService();
