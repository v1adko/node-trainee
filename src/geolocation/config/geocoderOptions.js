const nodeGeocoderOptions = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey:
    process.env.NODE_GEOCODER_API_KEY ||
    'AIzaSyDcCAmvDWDLJF3k7Ni-UJKRWunYMvl_jak',
  formatter: null
};

export default nodeGeocoderOptions;
