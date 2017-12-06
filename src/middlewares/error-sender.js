import BaseHttpError from '../lib/errors/base-http-error';

const errorSender = (error, requset, response, next) => {
  if (error instanceof BaseHttpError) {
    error.send(response);
    next();
  } else {
    response.status(error.status || 500).json({ message: error.message });
    next(error);
  }
};

export default errorSender;
