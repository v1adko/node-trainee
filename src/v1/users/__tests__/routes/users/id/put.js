import simulate from '../../../../../../tests/requestHelper';
import jwtService from '../../../../../../services/jwtService';
import User from '../../../../models/user';
import userDao from '../../../../dao';
import mockDB from '../../../../testHelpers/mockDB';
import permissions from '../../../../../../constants/permissions';
import { passwordService } from '../../../../services/index';

const filename = __filename.slice(__dirname.length + 1, -3);

const ROUTE = '/v1/users';

const username = `testUsername${filename}`;
const password = `testPassword${filename}`;
const newUsername = `testNewUsername${filename}`;
const newPass = `testNewPass${filename}`;
const newRole = permissions.ADMIN.value;
const wrongUserId = `wrongUserId${filename}`;
const wrongToken = `wrongToken${filename}`;
let user;
let userToken;
let adminToken;

async function clean() {
  await mockDB.cleanDB();
  userToken = null;
}

async function createUser() {
  const userActor = new User();
  const adminActor = new User();
  adminActor.role = permissions.ADMIN.value;
  userToken = jwtService.generateJwt(userActor);
  adminToken = jwtService.generateJwt(adminActor);
  user = await mockDB.createUser(username, password);
}

describe(`Test the ${ROUTE}/:id path`, () => {
  afterEach(clean);
  beforeEach(createUser);

  it('should change user by id', async () => {
    const route = `${ROUTE}/${user._id}`;
    const body = { username: newUsername, password: newPass, role: newRole };
    const result = await simulate.put(route, 200, body, adminToken);
    const { message } = result.body;
    const changedUser = await userDao.getById(user.id);
    const { _id, username: name, role } = changedUser;
    const passwordChecked = passwordService.valid(changedUser, newPass);

    expect(message).toBe('User was updated');
    expect(_id).toEqual(user._id);
    expect(name).toBe(newUsername);
    expect(role).toEqual(newRole);
    expect(passwordChecked).toBe(true);
  });

  it('should change only username', async () => {
    const route = `${ROUTE}/${user._id}`;
    const body = { username: newUsername };
    const result = await simulate.put(route, 200, body, adminToken);
    const { message } = result.body;
    const changedUser = await userDao.getById(user.id);
    const { _id, username: name, role } = changedUser;
    const passwordChecked = passwordService.valid(changedUser, password);

    expect(message).toBe('User was updated');
    expect(_id).toEqual(user._id);
    expect(name).toBe(newUsername);
    expect(role).toEqual(user.role);
    expect(passwordChecked).toBe(true);
  });

  it('should change only password', async () => {
    const route = `${ROUTE}/${user._id}`;
    const body = { password: newPass };
    const result = await simulate.put(route, 200, body, adminToken);
    const { message } = result.body;
    const changedUser = await userDao.getById(user.id);
    const { _id, username: name, role } = changedUser;
    const passwordChecked = passwordService.valid(changedUser, newPass);

    expect(message).toBe('User was updated');
    expect(_id).toEqual(user._id);
    expect(name).toBe(user.username);
    expect(role).toEqual(user.role);
    expect(passwordChecked).toBe(true);
  });

  it('should not return user in response on GET method, because user token is not valid', async () => {
    const route = `${ROUTE}/${user._id}`;
    const body = { username: newUsername, password: newPass, role: newRole };
    const result = await simulate.put(route, 500, body, wrongToken);
    const { auth, message } = result.body;

    expect(auth).toBe(false);
    expect(message).toBe('Failed to authenticate token.');
  });

  it('should not return user in response on GET method, because user token is not have enough permissions', async () => {
    const route = `${ROUTE}/${user._id}`;
    const body = { username: newUsername, password: newPass, role: newRole };
    const result = await simulate.put(route, 403, body, userToken);
    const { message } = result.body;

    expect(message).toBe("You don't have permission for this action");
  });

  it('should not return user in response on GET method, because user id is wrong', async () => {
    const route = `${ROUTE}/${wrongUserId}`;
    const body = { username: newUsername, password: newPass, role: newRole };
    const result = await simulate.put(route, 400, body, adminToken);
    const { message } = result.body;

    expect(message).toBe("User doesn't exist");
  });
});
