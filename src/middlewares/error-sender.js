const getErrorCode = error => error.status || error.code || 500;

const getCommonErrorResponseObject = error => ({
  name: error.name,
  message: `${error.name}(${getErrorCode(error)}): ${error.message}`,
  code: getErrorCode(error),
  payload: error.payload
});

const errorSender = (error, requset, response, next) => {
  const errorResponseObject = getCommonErrorResponseObject(error);
  const code = getErrorCode(error);

  response.status(code).json({ error: errorResponseObject });

  next(error);
};

export default errorSender;
