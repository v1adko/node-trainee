import errorsResponses from '../utils/errorsResponses';

const errorSender = (error, requset, response, next) => {
  const errorResponse = errorsResponses[error.name];
  if (errorResponse) {
    response.status(error.status || 500).json(errorResponse);
  } else {
    response.status(error.status || 500).json(error.message);
  }

  next();
};

export default errorSender;
