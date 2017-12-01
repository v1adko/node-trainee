import simulate from '../../../../../utils/tests-utils/request-helper';
import jwtService from '../../../../services/jwt-service';
import mockDB from '../../../../../utils/tests-utils/mock-db';
import UserFields from '../../../../../utils/tests-utils/test-user-fields';

jest.setTimeout(10000);

const { username, password } = UserFields;
let userToken = null;

async function clean() {
  await mockDB.cleanDB();
  userToken = null;
}

async function createUser() {
  const user = await mockDB.createUser(username, password);
  userToken = jwtService.generateJwt(user);
}

beforeAll(clean);

describe('Test the "/v1/geolocation/:location" path', () => {
  beforeEach(createUser);
  afterEach(clean);

  it('should response the GET method', async () => {
    const result = await simulate.get(
      '/v1/geolocation/kharkiv',
      200,
      userToken
    );
    expect(result.body[0].address).toBe('Kharkiv, Kharkiv Oblast, Ukraine');
    expect(result.body[0].coordinates).toEqual({
      lat: 49.9935,
      lon: 36.230383
    });
  });

  it('should response the GET method', async () => {
    const result = await simulate.get(
      '/v1/geolocation/50fasdfasdf3fd32d',
      200,
      userToken
    );
    expect(result.body).toEqual([]);
  });
});
