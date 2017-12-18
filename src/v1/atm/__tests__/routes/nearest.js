import simulate from '../../../../utils/tests-utils/request-helper';
import UserFields from '../../../../utils/tests-utils/test-user-fields';
import User from '../../../users/user-model';
import mockDB from '../../../../utils/tests-utils/mock-db';

const ROUTE = '/v1/atms/nearest';

const { getUserToken } = UserFields;
let userToken = null;

beforeAll(() => {
  userToken = getUserToken(User);
});

afterAll(mockDB.closeConnection);

describe(`Test the ${ROUTE} path`, () => {
  it('should return 5 or less nearest atms (point is in Ukrain)', async () => {
    const route = `${ROUTE}?latitude=49.9935&longitude= 36.230383`;
    const result = await simulate.get(route, 200, userToken);

    expect(result).toMatchSnapshot();
  });

  it('should return 5 or less nearest atms 1 (point is not in Ukrain)', async () => {
    const route = `${ROUTE}?latitude=-49.9935&longitude= 36.230383`;
    const result = await simulate.get(route, 200, userToken);

    expect(result).toMatchSnapshot();
  });
});
