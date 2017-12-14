import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
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

  generateSaltAndHash = (password) => {
    const saltAndHash = {};
    saltAndHash.salt = genSaltSync(10);
    saltAndHash.hash = hashSync(password, this.salt);
    return saltAndHash;
  };
}

export default new PasswordService();
