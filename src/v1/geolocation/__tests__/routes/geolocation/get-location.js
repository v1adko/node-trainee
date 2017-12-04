import simulate from '../../../../../utils/tests-utils/request-helper';
import jwtService from '../../../../services/jwt-service';
import mockDB from '../../../../../utils/tests-utils/mock-db';
import UserFields from '../../../../../utils/tests-utils/test-user-fields';

jest.setTimeout(10000);

const ROUTE = '/v1/geolocation';

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
afterAll(mockDB.closeConnection);

describe(`Test the "${ROUTE}/:location" path`, () => {
  beforeEach(createUser);
  afterEach(clean);

  it('should response the GET method', async () => {
    const route = `${ROUTE}/kharkiv`;
    const result = await simulate.get(route, 200, userToken);
    expect(result.body[0].address).toBe('Kharkiv, Kharkiv Oblast, Ukraine');
    expect(result.body[0].coordinates).toEqual({
      lat: 49.9935,
      lon: 36.230383
    });
  });

  it('should response the GET method', async () => {
    const route = `${ROUTE}/50fasdfasdf3fd32d`;
    const result = await simulate.get(route, 200, userToken);
    expect(result.body).toEqual([]);
  });

  it('should return error because address more than 300 symbols', async () => {
    const route = `${ROUTE}/${'a'.repeat(301)}`;
    const result = await simulate.get(route, 400, userToken);
    const { message } = result.body;
    expect(message).toEqual('All fields required.');
  });
});
