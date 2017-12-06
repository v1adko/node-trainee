const getRequestData = (request) => {
  const data = {
    ...request.body,
    ...request.params,
    ...request.query
  };
  const accessToken =
    request && request.headers && request.headers.access_token;
  if (accessToken) {
    data.accessToken = accessToken;
  }
  return data;
};

export default getRequestData;
