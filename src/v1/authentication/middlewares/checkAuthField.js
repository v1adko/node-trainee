import HttpStatus from 'http-status-codes';

function checkAuthField(request, response, next) {
  if (!request.body.username || !request.body.password) {
    return response
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'All fields required' });
  }
  return next();
}

export default checkAuthField;
