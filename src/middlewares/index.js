import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import passport from 'passport';

import config from '../config';
import jwtValidator from './jwtValidator';

function applyMiddleware(app) {
  app.use(morgan(config.morganConfig));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
  app.use(methodOverride('X-HTTP-Method-Override'));
  app.use(passport.initialize());

  app.use(jwtValidator);
}

export default applyMiddleware;
