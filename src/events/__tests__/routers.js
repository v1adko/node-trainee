const { eventDao } = require('../dao');
const simulate = require('../../tests/requestHelper');

describe('Test the "/events/" path for setting coordinates', () => {
  test('It should return new event with coordinates', async () => {
    await
    simulate.post(
      '/events/',
      200,
      { address: 'Чичибабина 1' },
      (res) => {
        if (res.body.address !== 'Chychybabina St, 1, Kharkiv, Kharkiv Oblast, Ukraine, 61000' ||
        res.body.coordinations.lat !== 50.0047412 ||
        res.body.coordinations.lon !== 36.2224174) {
          throw new Error("Fields doesn't match");
        }
        eventDao.deleteById(res.body._id);
      }
    );
  });
});
