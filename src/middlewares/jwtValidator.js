import jwtService from '../services/jwtService';

async function jwtValidator(request, response, next) {
  const token = request.headers['x-access-token'];
  if (token) {
    try {
      const decodedToken = await jwtService.decoder(token);
      const { _id: id, role } = decodedToken;
      request.user = { id, role };
    } catch (error) {
      response.status(500).send({ auth: false, message: error.message });
      return;
    }
  }
  next();
}

export default jwtValidator;
