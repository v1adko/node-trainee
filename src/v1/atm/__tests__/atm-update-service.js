import mockDB from '../../../utils/tests-utils/mock-db';
import atmUpdateService from '../atm-update-service';

jest.setTimeout(50000);

const ROUTE = '/v1/atms/nearest';
const TEST_URL_1 =
  'https://api.privatbank.ua/p24api/infrastructure?json&atm&address=&city=Kharkiv';
const TEST_URL_2 =
  'https://api.privatbank.ua/p24api/infrastructure?json&atm&address=square Druzhby Narodiv&city=Kyiv';
const TEST_URL_3 =
  'https://api.privatbank.ua/p24api/infrastructure?json&atm&address=&city=Kyiv';
const { url } = atmUpdateService;

const doSetup = async () => {
  await mockDB.connect();
  atmUpdateService.DAO.deleteAll();
  atmUpdateService.url = TEST_URL_1;
};

const clean = async () => {
  await mockDB.closeConnection();
  atmUpdateService.url = url;
};

beforeAll(doSetup);

afterAll(clean);

describe(`Test the ${ROUTE} path`, () => {
  it('should update all ATMs in database', async () => {
    const {
      stored,
      added,
      removed
    } = await atmUpdateService.updateAtmsDataInDB();
    const allAtms = await atmUpdateService.DAO.getAllHashesLean();

    expect(stored + added - removed).toBe(allAtms.length);
  });

  it('should update all ATMs in database (add new and remove old)', async () => {
    atmUpdateService.url = TEST_URL_2;
    const {
      stored,
      added,
      removed
    } = await atmUpdateService.updateAtmsDataInDB();
    const allAtms = await atmUpdateService.DAO.getAllHashesLean();

    expect(stored + added - removed).toBe(allAtms.length);
  });

  it('should update all ATMs in database (add new atms)', async () => {
    atmUpdateService.url = TEST_URL_3;
    const {
      stored,
      added,
      removed
    } = await atmUpdateService.updateAtmsDataInDB();
    const allAtms = await atmUpdateService.DAO.getAllHashesLean();

    expect(stored + added - removed).toBe(allAtms.length);
  });
});
