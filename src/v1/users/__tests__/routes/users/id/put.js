import simulate from '../../../../../../utils/tests-utils/request-helper';
import jwtService from '../../../../../services/jwt-service';
import User from '../../../../user-model';
import userDao from '../../../../user-dao';
import mockDB from '../../../../../../utils/tests-utils/mock-db';
import permissions from '../../../../../../constants/permissions';
import { passwordService } from '../../../../services/index';
import UserFields from '../../../../../../utils/tests-utils/test-user-fields';

const ROUTE = '/v1/users';

const {
  username,
  password,
  newUsername,
  newPassword,
  invalidUserId,
  invalidToken,
  shortUsername,
  invalidRole,
  notExistingUserId
} = UserFields;
const newRole = permissions.ADMIN.value;
let user;
let userToken;
let adminToken;

async function clean() {
  await mockDB.cleanDB();
  userToken = null;
}

async function createUserAndAccessTokens() {
  const userActor = new User();
  const adminActor = new User();
  adminActor.role = permissions.ADMIN.value;
  userToken = jwtService.generateJwt(userActor);
  adminToken = jwtService.generateJwt(adminActor);
  user = await mockDB.createUser(username, password);
}

beforeAll(clean);
afterAll(mockDB.closeConnection);

describe(`Test the ${ROUTE}/:id path`, () => {
  afterEach(clean);
  beforeEach(createUserAndAccessTokens);

  it('should change user by id', async () => {
    const route = `${ROUTE}/${user.id}`;
    const body = {
      username: newUsername,
      password: newPassword,
      role: newRole
    };
    const result = await simulate.put(route, 200, body, adminToken);
    const { message } = result.body;
    const changedUser = await userDao.getById(user.id);
    const { id, username: name, role } = changedUser;
    const passwordChecked = passwordService.valid(changedUser, newPassword);

    expect(message).toBe('User was updated');
    expect(id).toEqual(user.id);
    expect(name).toBe(newUsername);
    expect(role).toEqual(newRole);
    expect(passwordChecked).toBe(true);
  });

  it('should change only username', async () => {
    const route = `${ROUTE}/${user.id}`;
    const body = { username: newUsername };
    const result = await simulate.put(route, 200, body, adminToken);
    const { message } = result.body;
    const changedUser = await userDao.getById(user.id);
    const { id, username: name, role } = changedUser;
    const passwordChecked = passwordService.valid(changedUser, password);

    expect(message).toBe('User was updated');
    expect(id).toEqual(user.id);
    expect(name).toBe(newUsername);
    expect(role).toEqual(user.role);
    expect(passwordChecked).toBe(true);
  });

  it('should change only password', async () => {
    const route = `${ROUTE}/${user.id}`;
    const body = { password: newPassword };
    const result = await simulate.put(route, 200, body, adminToken);
    const { message } = result.body;
    const changedUser = await userDao.getById(user.id);
    const { id, username: name, role } = changedUser;
    const passwordChecked = passwordService.valid(changedUser, newPassword);

    expect(message).toBe('User was updated');
    expect(id).toEqual(user.id);
    expect(name).toBe(user.username);
    expect(role).toEqual(user.role);
    expect(passwordChecked).toBe(true);
  });

  it('should not return user in response on GET method, because user token is not valid', async () => {
    const route = `${ROUTE}/${user.id}`;
    const body = {
      username: newUsername,
      password: newPassword,
      role: newRole
    };
    const result = await simulate.put(route, 401, body, invalidToken);
    const { auth, message } = result.body;

    expect(auth).toBe(false);
    expect(message).toBe('Invalid token, please repeat authentication.');
  });

  it('should not return user in response on GET method, because user token is not have enough permissions', async () => {
    const route = `${ROUTE}/${user.id}`;
    const body = {
      username: newUsername,
      password: newPassword,
      role: newRole
    };
    const result = await simulate.put(route, 403, body, userToken);
    const { message } = result.body;

    expect(message).toBe('Access was denied. Not enough permissions.');
  });

  it('should not return user in response on GET method, because user id is wrong', async () => {
    const route = `${ROUTE}/${invalidUserId}`;
    const body = {
      username: newUsername,
      password: newPassword,
      role: newRole
    };
    const result = await simulate.put(route, 400, body, adminToken);
    const { message } = result.body;

    expect(message).toBe('All fields required.');
  });

  it('should not return user in response on GET method, because user is not exist', async () => {
    const route = `${ROUTE}/${notExistingUserId}`;
    const body = {
      username: newUsername,
      password: newPassword,
      role: newRole
    };
    const result = await simulate.put(route, 500, body, adminToken);
    const { message } = result.body;

    expect(message).toBe("Cannot set property 'username' of null"); // TODO: Fix it, when will do errors
  });

  it('should not update user because new username less than 6 symbols', async () => {
    const route = `${ROUTE}/${user.id}`;
    const body = { username: shortUsername };
    const result = await simulate.put(route, 400, body, adminToken);
    const { message } = result.body;

    expect(message).toBe('All fields required.');
  });

  it('should not update user because role is invalid', async () => {
    const route = `${ROUTE}/${user.id}`;
    const body = { role: invalidRole };
    const result = await simulate.put(route, 400, body, adminToken);
    const { message } = result.body;

    expect(message).toBe('All fields required.');
  });
});
