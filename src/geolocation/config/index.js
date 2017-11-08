const nodeGeocoderOptions = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.nodeGeocoderApiKey || 'AIzaSyDcCAmvDWDLJF3k7Ni-UJKRWunYMvl_jak',
  formatter: null
};

module.exports = { nodeGeocoderOptions };
