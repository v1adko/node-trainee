import simulate from '../../../../../tests/requestHelper';
import jwtService from '../../../../../services/jwtService';
import mockDB from '../../../testHelpers/mockDB';

const filename = __filename.slice(__dirname.length + 1, -3);

const USERNAME = `testUsername${filename}`;
const PASSWORD = `testPassword${filename}`;
const NEW_PASSWORD = `newTestPassword100${filename}`;
const WRONG_PASSWORD = `wrongTestPassword100${filename}`;
const WROUNG_USER_TOKEN = `wrongUserToken${filename}`;
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

describe('Test the "/v1/myprofile/changepassword" path', () => {
  const route = '/v1/myprofile/changepassword';

  beforeEach(createUser);

  afterEach(clean);

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
      { password: PASSWORD, newPassword: NEW_PASSWORD },
      WROUNG_USER_TOKEN
    );
    const { message } = result.body;

    expect(message).toBe('Failed to authenticate token.');
  });
});
