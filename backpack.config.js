module.exports = {
  webpack: (config, options, webpack) => {
    const conf = config;

    conf.entry.main = [
      './server.js'
    ];

    return conf;
  }
};
