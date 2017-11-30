import simulate from '../../../../../utils/tests-utils/request-helper';
import jwtService from '../../../../services/jwt-service';
import mockDB from '../../../../../utils/tests-utils/mock-db';
import { passwordService } from '../../../services/index';
import UserFields from '../../../../../utils/tests-utils/test-user-fields';

const ROUTE = '/v1/myprofile/changepassword';

const {
  username,
  password,
  newPassword,
  wrongPassword,
  invalidToken,
  shortPassword
} = UserFields;

let user;
let userToken;

async function clean() {
  await mockDB.cleanDB();
  userToken = null;
}

async function createUser() {
  user = await mockDB.createUser(username, password);
  userToken = jwtService.generateJwt(user);
}

beforeAll(clean);
afterAll(mockDB.closeConnection);

describe.skip(`Test the ${ROUTE} path`, () => {
  beforeEach(createUser);
  afterEach(clean);

  it('should change password for user and return authentication status, valid token', async () => {
    const body = { password, newPassword };
    const { auth, token } = await simulate.put(ROUTE, 200, body, userToken);
    const decodedToken = await jwtService.decoder(token);
    const changedUser = await mockDB.DAO.getById(user.id);
    const passwordChecked = passwordService.valid(changedUser, newPassword);

    expect(passwordChecked).toBe(true);
    expect(auth).toBe(true);
    expect(decodedToken.id).toBe(user.id.toString());
  });

  it('should not change password for user, because password is wrong', async () => {
    const body = { password: wrongPassword, newPassword };
    const { error } = await simulate.put(ROUTE, 400, body, userToken);

    expect(error).toMatchSnapshot();
  });

  it('should not change password for user, because tokken is wrong', async () => {
    const body = { password, newPassword };
    const { error } = await simulate.put(ROUTE, 401, body, invalidToken);

    expect(error).toMatchSnapshot();
  });

  it('should not change password because newPassword less than 6 symbols', async () => {
    const body = { password, newPassword: shortPassword };
    const { error } = await simulate.put(ROUTE, 400, body, userToken);

    expect(error).toMatchSnapshot();
  });
});
