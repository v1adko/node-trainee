import mockDB from '../../../utils/tests-utils/mock-db';
import atmUpdateService from '../atm-update-service';

jest.setTimeout(50000);

const ROUTE = '/v1/atms/nearest';

const doSetup = async () => {
  await mockDB.connect();
  atmUpdateService.DAO.deleteAll();
};

beforeAll(doSetup);

afterAll(mockDB.closeConnection);

describe(`Test the ${ROUTE} path`, () => {
  it('should update all ATMs in database', async () => {
    await atmUpdateService.updateAtmsDataInDB();
  });
});
