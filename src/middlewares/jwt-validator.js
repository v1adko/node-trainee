import jwtService from '../v1/services/jwt-service';

async function jwtValidator(request, response, next) {
  const token = request.headers.access_token;
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
