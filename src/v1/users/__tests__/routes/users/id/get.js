import simulate from '../../../../../../utils/tests-utils/request-helper';
import jwtService from '../../../../../services/jwt-service';
import User from '../../../../user-model';
import mockDB from '../../../../../../utils/tests-utils/mock-db';
import UserFields from '../../../../../../utils/tests-utils/test-user-fields';

const ROUTE = '/v1/users';

const {
  username, password, invalidUserId, invalidToken
} = UserFields;

let user;
let userToken;

async function clean() {
  await mockDB.cleanDB();
  userToken = null;
}

async function createUser() {
  const userActor = new User();
  userToken = jwtService.generateJwt(userActor);
  user = await mockDB.createUser(username, password);
}

beforeAll(async () => {
  await clean();
  mockDB.createDefaultUsers();
});
afterAll(mockDB.closeConnection);

describe(`Test the ${ROUTE}/:id path`, () => {
  afterAll(clean);
  beforeAll(createUser);

  it('should return user by id in response on GET method', async () => {
    const route = `${ROUTE}/${user.id}`;
    const { id, username: name, role } = await simulate.get(
      route,
      200,
      userToken
    );

    expect(id).toBe(user.id.toString());
    expect(name).toBe(user.username);
    expect(role).toBe(user.role);
  });

  it('should not return user in response on GET method, because user token is not valid', async () => {
    const route = `${ROUTE}/${user.id}`;
    const { error } = await simulate.get(route, 401, invalidToken);

    expect(error).toMatchSnapshot();
  });

  it('should not return user in response on GET method, because user id is invalid', async () => {
    const route = `${ROUTE}/${invalidUserId}`;
    const { error } = await simulate.get(route, 400, userToken);

    expect(error).toMatchSnapshot();
  });

  it('should not return user, bacuse it does not exist', async () => {
    user.remove(user.id);
    const route = `${ROUTE}/${user.id}`;
    const { error } = await simulate.get(route, 404, userToken);

    expect(error).toMatchSnapshot();
  });
});
