import simulate from '../../../../utils/tests-utils/request-helper';
import UserFields from '../../../../utils/tests-utils/test-user-fields';
import User from '../../../users/user-model';
import mockDB from '../../../../utils/tests-utils/mock-db';
import atmUpdateService from '../../atm-update-service';

jest.setTimeout(50000);

const ROUTE = '/v1/atms/nearest';
const TEST_URL =
  'https://api.privatbank.ua/p24api/infrastructure?json&atm&address=&city=Kharkiv';
const { url } = atmUpdateService;

const { getUserToken } = UserFields;
let userToken = null;

const doSetup = async () => {
  atmUpdateService.DAO.deleteAll();
  await mockDB.cleanDB();
  userToken = getUserToken(User);
  atmUpdateService.url = TEST_URL;
  await atmUpdateService.updateAtmsDataInDB();
};

const removeIdFromData = (data) => {
  const dataWithoutId = data;
  for (let i = 0; i < data.length; i += 1) {
    delete dataWithoutId[i]._id;
  }
  return dataWithoutId;
};

const clean = async () => {
  await mockDB.closeConnection();
  atmUpdateService.url = url;
};

beforeAll(doSetup);

afterAll(clean);

describe(`Test the ${ROUTE} path`, () => {
  it('should return 5 or less nearest atms (point is in Ukrain)', async () => {
    const route = `${ROUTE}?latitude=49.9935&longitude= 36.230383`;
    const result = await simulate.get(route, 200, userToken);
    const dataWithoutId = removeIdFromData(result);

    expect(dataWithoutId).toMatchSnapshot();
  });

  it('should return 5 or less nearest atms 1 (point is not in Ukrain)', async () => {
    const route = `${ROUTE}?latitude=-49.9935&longitude= 36.230383`;
    const result = await simulate.get(route, 200, userToken);
    const dataWithoutId = removeIdFromData(result);

    expect(dataWithoutId).toMatchSnapshot();
  });
});
