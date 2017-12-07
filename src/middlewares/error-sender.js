import BaseHttpError from '../lib/errors/base-http-error';

const getErrorCode = error => error.status || error.code || 500;

const getCommonErrorResponseObject = error => ({
  name: error.name,
  message: `${Error.name}(${getErrorCode(error)}): ${error.message}`,
  code: getErrorCode(error)
});

const errorSender = (error, requset, response, next) => {
  if (error instanceof BaseHttpError) {
    error.send(response);
  } else {
    response
      .status(getErrorCode(error))
      .json({ error: getCommonErrorResponseObject(error) });
  }
  next(error);
};

export default errorSender;
