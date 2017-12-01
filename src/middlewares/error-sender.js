import errorsResponses from '../lib/errors-responses';

const errorSender = (error, requset, response, next) => {
  const errorResponse = errorsResponses[error.name];
  if (errorResponse) {
    response.status(error.status || 500).json(errorResponse);
    next();
  } else {
    response.status(error.status || 500).json(error.message);
    next(error);
  }
};

export default errorSender;
