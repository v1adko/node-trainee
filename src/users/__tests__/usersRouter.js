import simulate from '../../tests/requestHelper';
import userDao from '../dao';

const adminUsername = 'testAdminUsername100';
const adminPassword = 'testAdminPassword100';
const username = 'testUsername100';
const password = 'testPassword100';
const wrongAdminToken = 'wrongAdminToken';
let userId;
let adminId;
let adminToken;

function clean() {
  if (adminId) {
    userDao.deleteById(adminId);
  }
  if (userId) {
    userDao.deleteById(userId);
  }
  userId = null;
  adminId = null;
  adminToken = null;
}

async function registerAdmin() {
  const result = await simulate.post('/authentication/register/', 200, {
    username: adminUsername,
    password: adminPassword
  });
  const { id, token } = result.body;
  adminId = id;
  adminToken = token;
}

describe('Test the "/users" path', () => {
  beforeEach(() => registerAdmin());
  afterEach(() => clean());

  it('should return all users in response on GET method', async () => {
    const result = await simulate.get('/users/', 200, adminToken);
    const { body } = result;
    expect(body[adminId]).not.toBeUndefined();
  });

  it('should not return all users in response on GET method, because user token is not valid', async () => {
    const result = await simulate.get('/users/', 500, wrongAdminToken);
    const { auth, message } = result.body;
    expect(auth).toBe(false);
    expect(message).toBe('Failed to authenticate token.');
  });

  it('should create user and return it in response on POST method', async () => {
    const result = await simulate.post(
      '/users/',
      200,
      { username, password },
      adminToken
    );
    const { _id, username: returnedUsername } = result.body;
    userId = _id;

    expect(userId).toEqual(expect.any(String));
    expect(returnedUsername).toBe(username);
  });

  it('should not create user because user already exist', async () => {
    const resultFakeUser = await simulate.post(
      '/users/',
      200,
      { username, password },
      adminToken
    );
    userId = resultFakeUser.body._id;
    const result = await simulate.post(
      '/users/',
      200, // must be 400
      { username, password },
      adminToken
    );

    const { message } = result.body;

    expect(message).toBe('User already exist');
  });
});
