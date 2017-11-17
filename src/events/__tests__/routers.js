import simulate from '../../tests/requestHelper';

jest.setTimeout(10000);

describe('Test the "/events/" path for setting coordinates', () => {
  it('should return new event with coordinates', async () => {
    await simulate.post('/events/', 200, { address: 'Чичибабина 1' });
  });
});
