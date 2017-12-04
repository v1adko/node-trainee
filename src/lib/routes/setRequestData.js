const setRequestData = (request) => {
  const data = { ...request.body, ...request.params, ...request.query };
  request.data = data;
};

export default setRequestData;
