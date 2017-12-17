const jestConfig = {
  coverageThreshold: {
    global: {
      lines: 90
    }
  },
  rootDir: '../../',
  setupFiles: [`${__dirname}/mocks/logger.js`]
};

module.exports = jestConfig;
