module.exports = {
  webpack: (config) => {
    const conf = config;

    conf.entry.main = [
      './server.js'
    ];

    return conf;
  }
};
