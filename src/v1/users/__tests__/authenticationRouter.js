import simulate from '../../../tests/requestHelper';
import userDao from '../dao';
import jwtService from '../../../services/jwtService';

const username = 'testUsername100';
const password = 'testPassword100';
const newPassword = 'newTestPassword100';
const wrongPassword = 'wrongTestPassword100';
const wrongNewPassword = 'wrongNewTestPassword100';
const wrongUserToken = 'wrongUserToken';
let userId;
let userToken;

function deleteUser() {
  userDao.deleteById(userId);
  userId = null;
  userToken = null;
}

async function registerUser() {
  const result = await simulate.post('/authentication/register/', 200, {
    username,
    password
  });
  const { id, token } = result.body;
  userId = id;
  userToken = token;
}

describe('Test the "/authentication/register" path', () => {
  afterAll(() => deleteUser());

  it('should register new user and return authentication status, user id and valid token', async () => {
    const result = await simulate.post('/authentication/register/', 200, {
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
    const result = await simulate.post('/authentication/register/', 400, {
      username,
      password
    });
    const { auth, message } = result.body;

    expect(auth).toBe(false);
    expect(message).toBe('User already exist');
  });
});

describe('Test the "/authentication/changepass" path', () => {
  afterEach(() => deleteUser());

  beforeEach(() => registerUser());

  it('should change pass for user and return authentication status, valid token', async () => {
    const result = await simulate.put(
      '/authentication/changepass',
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
      '/authentication/changepass',
      400,
      { password: wrongPassword, newPassword },
      userToken
    );
    const { message } = result.body;

    expect(message).toBe('Password is wrong');
  });

  it('should not change pass for user, because tokken is wrong', async () => {
    const result = await simulate.put(
      '/authentication/changepass',
      500,
      { password: wrongPassword, newPassword },
      wrongUserToken
    );
    const { message } = result.body;

    expect(message).toBe('Failed to authenticate token.');
  });
});

describe('Test the "/authentication/login" path', () => {
  afterAll(() => deleteUser());

  beforeAll(() => registerUser());

  it('should login user and return authentication status, user id and valid token', async () => {
    const result = await simulate.post('/authentication/login', 200, {
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
    const result = await simulate.post('/authentication/login', 401, {
      username,
      password: wrongNewPassword
    });
    const { auth, message } = result.body;

    expect(auth).toBe(false);
    expect(message).toBe('Password is wrong');
  });
});
