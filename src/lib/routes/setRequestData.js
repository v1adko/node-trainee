const setRequestData = (request) => {
  const requestData = { ...request.body, ...request.params, ...request.query };
  request.requestData = requestData;
};

export default setRequestData;
