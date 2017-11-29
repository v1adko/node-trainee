import simulate from '../../../../../utils/tests/requestHelper';
import jwtService from '../../../../../services/jwtService';
import mockDB from '../../../../users/testHelpers/mockDB';
import UserHelper from '../../../../../utils/tests/testUserFields';

jest.setTimeout(10000);

const ROUTE = '/v1/geolocation';

const { username, password } = UserHelper;
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

describe('Test the "/v1/geolocation/:lat/:lon" path', () => {
  beforeEach(createUser);
  afterEach(clean);

  it('should response the GET method', async () => {
    const result = await simulate.get(`${ROUTE}/50/30`, 200, userToken);
    expect(result.body[0].address).toBe(
      "Unnamed Road, Kyivs'ka oblast, Ukraine"
    );
    expect(result.body[0].coordinates).toEqual({
      lat: 49.999137,
      lon: 30.0019538
    });
  });

  it('should response the GET method', async () => {
    const result = await simulate.get(`${ROUTE}/444/444`, 200, userToken);
    expect(result.body.error).toBe('Error');
    expect(result.body.message).toBe('Response status code is 400');
  });
});
