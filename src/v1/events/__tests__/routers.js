import simulate from '../../../utils/tests/requestHelper';

jest.setTimeout(10000);

describe('Test the "v1/events/" path for setting coordinates', () => {
  it('should return new event with coordinates', async () => {
    await simulate.post('/v1/events', 200, { address: 'Чичибабина 1' });
  });
});
