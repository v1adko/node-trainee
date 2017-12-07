import { compareSync } from 'bcryptjs';
import { WrongPasswordError } from '../../../lib/errors';

class PasswordService {
  valid = (user, password) => compareSync(password, user.hash);

  change = (user, password, newPassword) => {
    if (!this.valid(user, password)) {
      throw new WrongPasswordError();
    }

    const changedUser = user;
    changedUser.password = newPassword;
  };
}

export default new PasswordService();
