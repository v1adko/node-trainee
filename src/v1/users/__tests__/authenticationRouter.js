import simulate from '../../../tests/requestHelper';
import userDao from '../dao';
import User from '../models/user/';
import jwtService from '../../../services/jwtService';
import permissions from '../../../constants/permissions';

const username = 'testUsername100';
const password = 'testPassword100';
const newPassword = 'newTestPassword100';
const wrongPassword = 'wrongTestPassword100';
const wrongNewPassword = 'wrongNewTestPassword100';
const wrongUserToken = 'wrongUserToken';
let userId;
let userToken;

async function deleteUser() {
  await userDao.deleteById(userId);
  userId = null;
  userToken = null;
}

async function registerUser() {
  const user = new User();
  user.username = username;
  user.password = password;
  user.role = permissions.ADMIN.value;
  userDao.create(user);

  userId = user._id.toString();

  userToken = jwtService.generateJwt(user, permissions.ADMIN.value);
}

describe('Test the "/v1/authentication/register" path', () => {
  afterAll(() => deleteUser());

  it('should register new user and return authentication status, user id and valid token', async () => {
    const result = await simulate.post('/v1/authentication/register/', 200, {
      username,
      password
    });
    const { auth, id, token } = result.body;
    userId = id;
    const decodedToken = await jwtService.decoder(token);

    expect(auth).toBe(true);
    expect(decodedToken._id).toBe(id);
  });

  it('should not register new user, because it already exist', async () => {
    const result = await simulate.post('/v1/authentication/register/', 400, {
      username,
      password
    });
    const { auth, message } = result.body;

    expect(auth).toBe(false);
    expect(message).toBe('User already exist');
  });
});

describe('Test the "/v1/myprofile/changepassword" path', () => {
  afterEach(() => deleteUser());

  beforeEach(() => registerUser());

  it('should change pass for user and return authentication status, valid token', async () => {
    const result = await simulate.put(
      '/v1/myprofile/changepassword',
      200,
      { password, newPassword },
      userToken
    );
    const { auth, token } = result.body;
    const decodedToken = await jwtService.decoder(token);

    expect(auth).toBe(true);
    expect(decodedToken._id).toBe(userId);
  });

  it('should not change pass for user, because password is wrong', async () => {
    const result = await simulate.put(
      '/v1/myprofile/changepassword',
      400,
      { password: wrongPassword, newPassword },
      userToken
    );
    const { message } = result.body;

    expect(message).toBe('Password is wrong');
  });

  it('should not change pass for user, because tokken is wrong', async () => {
    const result = await simulate.put(
      '/v1/myprofile/changepassword',
      500,
      { password: wrongPassword, newPassword },
      wrongUserToken
    );
    const { message } = result.body;

    expect(message).toBe('Failed to authenticate token.');
  });
});

describe('Test the "/v1/authentication/login" path', () => {
  afterAll(() => deleteUser());

  beforeAll(() => registerUser());

  it('should login user and return authentication status, user id and valid token', async () => {
    const result = await simulate.post('/v1/authentication/login', 200, {
      username,
      password
    });
    const { auth, id, token } = result.body;
    const decodedToken = await jwtService.decoder(token);

    expect(auth).toBe(true);
    expect(id).toBe(userId);
    expect(decodedToken._id).toBe(userId);
  });

  it('should not login user, because password is wrong', async () => {
    const result = await simulate.post('/v1/authentication/login', 401, {
      username,
      password: wrongNewPassword
    });
    const { auth, message } = result.body;

    expect(auth).toBe(false);
    expect(message).toBe('Password is wrong');
  });
});
