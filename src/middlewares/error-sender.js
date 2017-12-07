import BaseHttpError from '../lib/errors/base-http-error';

const getErrorCode = error => error.status || error.code || 500;

const getCommonErrorResponseObject = error => ({
  name: error.name,
  message: `${Error.name}(${getErrorCode(error)}): ${error.message}`,
  code: getErrorCode(error)
});

const errorSender = (error, requset, response, next) => {
  let errorResponseObject;

  if (error instanceof BaseHttpError) {
    errorResponseObject = error.getResponseObject();
  } else {
    errorResponseObject = getCommonErrorResponseObject(error);
  }

  response.status(getErrorCode(error)).json({ error: errorResponseObject });

  next(error);
};

export default errorSender;
