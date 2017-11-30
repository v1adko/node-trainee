const errorSender = (error, requset, response, next) => {
  if (error.send && typeof error.send === 'function') {
    error.send(response);
    next();
  } else {
    response.status(error.status || 500).json({ message: error.message });
    next(error);
  }
};

export default errorSender;
