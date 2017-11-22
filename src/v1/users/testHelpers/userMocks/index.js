import permissons from '../../../../constants/permissions';

const DEFAULT_OPTIONS = {
  DEFAULT_NAME: 'testName',
  DEFAULT_PASSWORD: 'testPass'
};

const USER_COUNT = 3;

function createUsers() {
  const users = [];
  for (let i = 0; i < USER_COUNT; i += 1) {
    users[i] = {
      username: DEFAULT_OPTIONS.DEFAULT_NAME + i,
      password: DEFAULT_OPTIONS.DEFAULT_PASSWORD + i
    };
  }
  return users;
}

function createUser(postfics, role) {
  return {
    username: `${DEFAULT_OPTIONS.DEFAULT_NAME}${postfics}`,
    password: `${DEFAULT_OPTIONS.DEFAULT_PASSWORD}${postfics}`,
    role
  };
}

const users = createUsers();
const user = createUser('User', permissons.USER.value);
const admin = createUser('Admin', permissons.ADMIN.value);

export default {
  users,
  user,
  admin
};
