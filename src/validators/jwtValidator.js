import jwtService from '../services/jwtService';

async function verifyToken(request, response, next) {
  const token = request.headers['x-access-token'];
  if (!token) {
    return response
      .status(403)
      .send({ auth: false, message: 'No token provided.' });
  }

  try {
    const decodedToken = await jwtService.decoder(token);
    request.user = {
      id: decodedToken._id,
      role: decodedToken.role
    };
    next();
  } catch (error) {
    response.status(500).send({ auth: false, message: error.message });
  }

  return null;
}

export default verifyToken;
