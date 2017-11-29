import simulate from '../../../../../utils/tests/requestHelper';
import jwtService from '../../../../../services/jwtService';
import mockDB from '../../../../users/testHelpers/mockDB';
import UserHelper from '../../../../../utils/tests/testUserFields';

const ROUTE = '/v1/events';

jest.setTimeout(10000);

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

describe('Test the "/v1/events/" path for setting coordinates', () => {
  beforeEach(createUser);
  afterEach(clean);
  it('should return new event with coordinates', async () => {
    await simulate.post(ROUTE, 200, { address: 'Чичибабина 1' }, userToken);
  });
});
