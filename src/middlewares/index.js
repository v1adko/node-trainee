import jwtValidator from './jwtValidator';

function applyMiddleware(app) {
  app.all('*', jwtValidator);
}

export default applyMiddleware;
