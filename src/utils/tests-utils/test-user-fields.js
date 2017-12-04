const DEFAULT_OPTIONS = {
  DEFAULT_NAME: 'testName',
  DEFAULT_PASSWORD: 'testPass'
};

const USER_COUNT = 3;

class TestUserFields {
  static username = 'testUsername';
  static password = 'testPassword';
  static wrongPassword = 'wrongTestPassword';
  static newUsername = 'testNewUsername';
  static newPassword = 'newTestPassword';
  static invalidToken = 'invalidToken';
  static invalidUserId = 'invalidUserId';
  static invalidRole = 'testInvalidRole';
  static shortUsername = 'short';
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
}

export default TestUserFields;
