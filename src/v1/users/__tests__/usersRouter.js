import simulate from '../../../tests/requestHelper';
import userDao from '../dao';
import User from '../models/user/';
import jwtService from '../../../services/jwtService';
import permissions from '../../../constants/permissions';

// const adminUsername = 'testAdminUsername100';
// const adminPassword = 'testAdminPassword100';
const username = 'testUsername100';
const password = 'testPassword100';
const wrongAdminToken = 'wrongAdminToken';
let userId;
let adminId;
let adminToken;

async function clean() {
  if (adminId) {
    await userDao.deleteById(adminId);
  }
  if (userId) {
    await userDao.deleteById(userId);
  }
  userId = null;
  adminId = null;
  adminToken = null;
}

async function registerAdmin() {
  const admin = new User();
  admin.username = username;
  admin.password = password;
  admin.role = permissions.ADMIN.value;
  await userDao.create(admin);

  adminId = admin._id;

  adminToken = jwtService.generateJwt(admin, permissions.ADMIN.value);
}

describe('Test the "/v1/users" path', () => {
  beforeEach(() => registerAdmin());
  afterEach(() => clean());

  it('should return all users in response on GET method', async () => {
    const result = await simulate.get('/v1/users/', 200, adminToken);
    const { body } = result;
    expect(body[adminId]).not.toBeUndefined();
  });

  it('should not return all users in response on GET method, because user token is not valid', async () => {
    const result = await simulate.get('/v1/users/', 500, wrongAdminToken);
    const { auth, message } = result.body;
    expect(auth).toBe(false);
    expect(message).toBe('Failed to authenticate token.');
  });

  // it('should create user and return it in response on POST method', async () => {
  //   const result = await simulate.post(
  //     '/users/',
  //     200,
  //     { username, password },
  //     adminToken
  //   );
  //   const { _id, username: returnedUsername } = result.body;
  //   userId = _id;

  //   expect(userId).toEqual(expect.any(String));
  //   expect(returnedUsername).toBe(username);
  // });

  // it('should not create user because user already exist', async () => {
  //   const resultFakeUser = await simulate.post(
  //     '/users/',
  //     200,
  //     { username, password },
  //     adminToken
  //   );
  //   userId = resultFakeUser.body._id;
  //   const result = await simulate.post(
  //     '/users/',
  //     200, // must be 400
  //     { username, password },
  //     adminToken
  //   );

  //   const { message } = result.body;

  //   expect(message).toBe('User already exist');
  // });
});
