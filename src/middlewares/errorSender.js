const errorSender = (error, requset, response, next) => {
  response.status(error.status || 500).json(error.message);
  next();
};

export default errorSender;
