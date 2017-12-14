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
afterAll(mockDB.closeConnection);

describe('Test the "/v1/events/" path for setting coordinates', () => {
  beforeEach(createUser);
  afterEach(clean);
  it('should return new event with coordinates', async () => {
    const body = { address: 'Чичибабина 1' };
    await simulate.post(ROUTE, 200, body, userToken);
  });

  it('should return new event without coordinates', async () => {
    const body = {};
    await simulate.post(ROUTE, 200, body, userToken);
  });

  it('should not return new event, because address have to many matches', async () => {
    const body = { address: '50' };
    const { error } = await simulate.post(ROUTE, 400, body, userToken);

    expect(error).toMatchSnapshot();
  });

  it('should not return new event, because address does not have matches', async () => {
    const body = { address: 'fgf2349uiwef9' };
    const { error } = await simulate.post(ROUTE, 400, body, userToken);

    expect(error).toMatchSnapshot();
  });

  it('should return error because address less than 1 symbol', async () => {
    const body = { address: '' };
    const { error } = await simulate.post(ROUTE, 400, body, userToken);

    expect(error).toMatchSnapshot();
  });

  it('should return error because address more than 300 symbol', async () => {
    const body = { address: 'a'.repeat(301) };
    const { error } = await simulate.post(ROUTE, 400, body, userToken);

    expect(error).toMatchSnapshot();
  });
});
