import userService from '../user-service';
import mockDB from '../../../utils/tests-utils/mock-db';
import UserFields from '../../../utils/tests-utils/test-user-fields';
import jwtService from '../../services/jwt-service';

mockDB.connect();

const { username, password } = UserFields;

afterAll(mockDB.closeConnection);

describe('Test the user siervice', () => {
  afterEach(mockDB.cleanDB);

  it('should register new user and return authentication status, user id and valid token', async () => {
    const { auth, id, token } = await userService.registerUser(
      username,
      password
    );
    const decodedToken = await jwtService.decoder(token);

    expect(auth).toBe(true);
    expect(decodedToken.id).toBe(id);
  });
});
