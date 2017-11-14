function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const flagToCamelCase = flag => flag
  .substr(2)
  .split('-')
  .map((p, index) => {
    if (index > 0) {
      return capitalizeFirstLetter(p);
    }
    return p;
  })
  .join('');

const parseArgv = () => {
  const stringFlags = process.argv.filter(arg => arg.indexOf('--') === 0);
  const flags = {};
  stringFlags.forEach((flag) => {
    flags[flagToCamelCase(flag)] = true;
  });
  return flags;
};

export default parseArgv;
