import simulate from '../../../../../utils/tests-utils/request-helper';
import jwtService from '../../../../services/jwt-service';
import mockDB from '../../../../../utils/tests-utils/mock-db';
import UserFields from '../../../../../utils/tests-utils/test-user-fields';
import eventDao from '../../../event-dao';

const ROUTE = '/v1/events';

const { username, password, invalidToken } = UserFields;

let user;
let userToken;

async function clean() {
  await eventDao.model.remove();
  userToken = null;
}

async function createUser() {
  user = await mockDB.createUser(username, password);
  userToken = jwtService.generateJwt(user);
}

beforeAll(async () => {
  await clean();
});
afterAll(mockDB.closeConnection);

describe(`Test the ${ROUTE} path`, () => {
  afterAll(clean);
  beforeAll(createUser);

  it('should return all events in response on GET method', async () => {
    const postBody = { address: 'Чичибабина 1' };
    await simulate.post(ROUTE, 200, postBody, userToken);
    const body = await simulate.get(ROUTE, 200, userToken);

    expect(Object.keys(body).length).toBe(1);
  });

  it('should not return all events in response on GET method, because user token is not valid', async () => {
    const { error } = await simulate.get(ROUTE, 401, invalidToken);

    expect(error).toMatchSnapshot();
  });
});
