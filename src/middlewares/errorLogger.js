const errorSender = (error, requset, response, next) => {
  console.error('↓↓↓↓↓ errorSender ↓↓↓↓↓');
  console.error(error);
  console.error('↑↑↑↑↑ errorSender ↑↑↑↑↑');
  next(error);
};

export default errorSender;
