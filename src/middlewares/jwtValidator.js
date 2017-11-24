import jwtService from '../services/jwtService';
import { TokenValidationError } from '../errors';

async function jwtValidator(request, response, next) {
  const token = request.headers['x-access-token'];
  if (!token) {
    return next();
  }

  try {
    const tokenData = await jwtService.decoder(token);
    request.user = tokenData;
  } catch (error) {
    next(error);
  }

  return next();
}

export default jwtValidator;
