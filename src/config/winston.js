const tsFormat = () => new Date().toLocaleTimeString();

const consoleOptions = {
  timestamp: tsFormat,
  colorize: true,
  level: 'info'
};

module.exports = { consoleOptions };
