const getRequestData = (request) => {
  const data = {
    ...request.body,
    ...request.params,
    ...request.query
  };
  data.accessToken = request && request.headers && request.headers.access_token;
  return data;
};

export default getRequestData;
