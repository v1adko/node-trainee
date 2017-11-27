function checkAuthField(request, response, next) {
  if (!request.body.username || !request.body.password) {
    return response.status(400).json({ message: 'All fields required' });
  }
  return next();
}

export default checkAuthField;
