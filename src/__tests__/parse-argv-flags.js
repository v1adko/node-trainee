import parseArgvFlags from '../lib/parse-argv-flags';

describe('Test parse argv flags', () => {
  it('should create db connection', () => {
    process.argv = ['--testArg'];
    const result = parseArgvFlags();

    expect(result).toMatchSnapshot();
  });

  it('should create db connection', () => {
    process.argv = ['--test-arg'];
    const result = parseArgvFlags();

    expect(result).toMatchSnapshot();
  });

  it('should create db connection', () => {
    process.argv = [];
    const result = parseArgvFlags();

    expect(result).toEqual({});
  });

  it('should create db connection', () => {
    process.argv = ['some arg'];
    const result = parseArgvFlags();

    expect(result).toEqual({});
  });
});
