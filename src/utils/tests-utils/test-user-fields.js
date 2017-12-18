import jwtService from '../../v1/services/jwt-service';

const DEFAULT_OPTIONS = {
  DEFAULT_NAME: 'testName',
  DEFAULT_PASSWORD: 'testPass'
};

const USER_COUNT = 3;

class TestUserFields {
  static username = 'testUsername';
  static password = 'testPassword';
  static wrongUsername = 'wrongTestUsername';
  static wrongPassword = 'wrongTestPassword';
  static newUsername = 'testNewUsername';
  static newPassword = 'newTestPassword';
  static invalidToken = 'invalidToken';
  static invalidUserId = 'invalidUserId';
  static notExistingUserId = '5a0c0334ac12d0b03291725f';
  static invalidRole = 'testInvalidRole';
  static shortUsername = 'n';
  static shortPassword = 'short';
  static longUsername30 = 'a'.repeat(31);
  static longtPassword30 = 'a'.repeat(31);

  static getUserField = (postfics, role) => ({
    username: `${DEFAULT_OPTIONS.DEFAULT_NAME}${postfics}`,
    password: `${DEFAULT_OPTIONS.DEFAULT_PASSWORD}${postfics}`,
    role
  });

  static getUsersFields = (userCount = USER_COUNT) => {
    const users = [];
    for (let i = 0; i < userCount; i += 1) {
      users[i] = TestUserFields.getUserField(i);
    }
    return users;
  };

  static getUserToken = (UserConstructor, username, password, role) => {
    const user = new UserConstructor();
    user.username = username || TestUserFields.username;
    user.password = password || TestUserFields.password;
    if (role) user.role = role;

    const userToken = jwtService.generateJwt(user);
    return userToken;
  };
}

export default TestUserFields;
