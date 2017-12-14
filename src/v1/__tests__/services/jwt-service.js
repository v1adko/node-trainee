import mockDB from '../../../utils/tests-utils/mock-db';
import UserFields from '../../../utils/tests-utils/test-user-fields';
import jwtService from '../../services/jwt-service';

mockDB.connect();

const { username, password, invalidToken } = UserFields;

afterAll(mockDB.closeConnection);

describe('Test the jwt siervice', () => {
  afterEach(mockDB.cleanDB);

  it('should generate token and success decode it', async () => {
    const user = await mockDB.createUser(username, password);
    const token = jwtService.generateJwt(user);

    const tokenData = await jwtService.decoder(token);

    expect(tokenData.id).toBe(user.id);
    expect(tokenData.role).toBe(user.role);
  });

  it('should throw error. whan token is invalid', async () => {
    expect(jwtService.decoder(invalidToken)).rejects.toMatchSnapshot();
  });
});
