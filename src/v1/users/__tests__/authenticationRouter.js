import simulate from '../../../tests/requestHelper';
import jwtService from '../../../services/jwtService';
import mockDB from '../testHelpers/mockDB';

const USERNAME = 'testUsername100';
const PASSWORD = 'testPassword100';
const NEW_PASSWORD = 'newTestPassword100';
const WRONG_PASSWORD = 'wrongTestPassword100';
const WRONG_NEW_PASSWORD = 'wrongNewTestPassword100';
const WROUNG_USER_TOKEN = 'wrongUserToken';
const userFields = { username: USERNAME, password: PASSWORD };
let user;
let userId;
let userToken;

async function clean() {
  await mockDB.cleanDB();
  userId = null;
  userToken = null;
}

async function createUser() {
  user = await mockDB.createUser(USERNAME, PASSWORD);
  userId = user._id.toString();
  userToken = jwtService.generateJwt(user);
}

beforeAll(async () => mockDB.createDefaultUsers());

describe('Test the "/v1/authentication/register" path', () => {
  const route = '/v1/authentication/register/';

  afterAll(async () => {
    await clean();
  });

  it('should register new user and return authentication status, user id and valid token', async () => {
    const result = await simulate.post(route, 200, userFields);
    const { auth, id, token } = result.body;
    const decodedToken = await jwtService.decoder(token);

    expect(auth).toBe(true);
    expect(decodedToken._id).toBe(id);
  });

  it('should not register new user, because it already exist', async () => {
    const result = await simulate.post(route, 400, userFields);
    const { auth, message } = result.body;

    expect(auth).toBe(false);
    expect(message).toBe('User already exist');
  });
});

describe('Test the "/v1/myprofile/changepassword" path', () => {
  const route = '/v1/myprofile/changepassword';

  afterEach(async () => {
    await clean();
  });

  beforeEach(async () => {
    await createUser();
  });

  it('should change pass for user and return authentication status, valid token', async () => {
    const result = await simulate.put(
      route,
      200,
      { password: PASSWORD, newPassword: NEW_PASSWORD },
      userToken
    );

    const { auth, token } = result.body;
    const decodedToken = await jwtService.decoder(token);

    expect(auth).toBe(true);
    expect(decodedToken._id).toBe(userId);
  });

  it('should not change pass for user, because password is wrong', async () => {
    const result = await simulate.put(
      route,
      400,
      { password: WRONG_PASSWORD, newPassword: NEW_PASSWORD },
      userToken
    );
    const { message } = result.body;

    expect(message).toBe('Password is wrong');
  });

  it('should not change pass for user, because tokken is wrong', async () => {
    const result = await simulate.put(
      route,
      500,
      { password: WRONG_PASSWORD, newPassword: NEW_PASSWORD },
      WROUNG_USER_TOKEN
    );
    const { message } = result.body;

    expect(message).toBe('Failed to authenticate token.');
  });
});

describe('Test the "/v1/authentication/login" path', () => {
  const route = '/v1/authentication/login';

  afterAll(async () => {
    await clean();
  });

  beforeAll(async () => {
    await createUser();
  });

  it('should login user and return authentication status, user id and valid token', async () => {
    const result = await simulate.post(route, 200, userFields);
    const { auth, id, token } = result.body;
    const decodedToken = await jwtService.decoder(token);

    expect(auth).toBe(true);
    expect(id).toBe(userId);
    expect(decodedToken._id).toBe(userId);
  });

  it('should not login user, because password is wrong', async () => {
    const result = await simulate.post(route, 401, {
      username: USERNAME,
      password: WRONG_NEW_PASSWORD
    });
    const { auth, message } = result.body;

    expect(auth).toBe(false);
    expect(message).toBe('Password is wrong');
  });
});
