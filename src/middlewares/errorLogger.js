const errorSender = (error, requset, response, next) => {
  console.error('↓↓↓↓↓ errorSender ↓↓↓↓↓'); // TODO: Implement winston
  console.error(error);
  console.error('↑↑↑↑↑ errorSender ↑↑↑↑↑');
  next(error);
};

export default errorSender;
