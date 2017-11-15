function checkAuthField(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  return next();
}

export default checkAuthField;
