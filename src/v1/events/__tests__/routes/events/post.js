import simulate from '../../../../../utils/tests-utils/request-helper';
import jwtService from '../../../../services/jwt-service';
import mockDB from '../../../../../utils/tests-utils/mock-db';
import UserFields from '../../../../../utils/tests-utils/test-user-fields';

const ROUTE = '/v1/events';

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

describe('Test the "/v1/events/" path for setting coordinates', () => {
  beforeEach(createUser);
  afterEach(clean);
  it('should return new event with coordinates', async () => {
    const body = { address: 'Чичибабина 1' };
    await simulate.post(ROUTE, 200, body, userToken);
  });

  it('should return error because address less than 1 symbol', async () => {
    const body = { address: '' };
    const result = await simulate.post(ROUTE, 400, body, userToken);
    const { message } = result.body;

    expect(message).toBe('All fields required.');
  });

  it('should return error because address more than 300 symbol', async () => {
    const body = { address: 'a'.repeat(301) };
    const result = await simulate.post(ROUTE, 400, body, userToken);
    const { message } = result.body;

    expect(message).toBe('All fields required.');
  });
});
