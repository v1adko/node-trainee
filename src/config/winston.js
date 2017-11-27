const tsFormat = () => new Date().toLocaleTimeString();

const consoleOptions = {
  timestamp: tsFormat,
  colorize: true,
  level: 'info'
};

export default { consoleOptions };
