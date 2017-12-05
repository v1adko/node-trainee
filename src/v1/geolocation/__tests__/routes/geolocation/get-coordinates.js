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

describe('Test the "/v1/geolocation/:lat/:lon" path', () => {
  beforeEach(createUser);
  afterEach(clean);

  it('should response the GET method', async () => {
    const result = await simulate.get(`${ROUTE}/50/30`, 200, userToken);
    const { address, coordinates } = result[0];
    expect(address).toBe("Unnamed Road, Kyivs'ka oblast, Ukraine");
    expect(coordinates).toEqual({ lat: 49.999137, lon: 30.0019538 });
  });

  it('should response the GET method', async () => {
    const { error, message } = await simulate.get(
      `${ROUTE}/444/444`,
      200,
      userToken
    );
    expect(error).toBe('Error');
    expect(message).toBe('Response status code is 400');
  });

  it('should return error because first argument is not a number', async () => {
    const { message } = await simulate.get(`${ROUTE}/abc/100`, 400, userToken);
    expect(message).toMatchSnapshot();
  });

  it('should return error because second argument is not a number', async () => {
    const { message } = await simulate.get(`${ROUTE}/100/abc`, 400, userToken);
    expect(message).toMatchSnapshot();
  });
});
