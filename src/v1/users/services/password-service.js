import { compareSync } from 'bcryptjs';
import { RequestValidationError } from '../../../lib/errors';

class PasswordService {
  valid = (user, password) => compareSync(password, user.hash);

  change = (user, password, newPassword) => {
    if (!this.valid(user, password)) {
      throw new RequestValidationError(
        'Password is wrong, please check input data.'
      );
    }

    const changedUser = user;
    changedUser.password = newPassword;
  };
}

export default new PasswordService();
