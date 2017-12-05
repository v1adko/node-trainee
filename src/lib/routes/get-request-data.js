const getRequestData = (request) => {
  const data = { ...request.body, ...request.params, ...request.query };
  return data;
};

export default getRequestData;
