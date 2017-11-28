import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import passport from 'passport';

import { morganConfig } from '../config';
import jwtValidator from './jwtValidator';
import errorLogger from './errorLogger';
import errorSender from './errorSender';

import v1 from '../v1/routes';

function applyMiddleware(app) {
  app.use(morgan(morganConfig));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
  app.use(methodOverride('X-HTTP-Method-Override'));
  app.use(passport.initialize());

  app.use(jwtValidator);

  app.use('/v1', v1);

  // Catch errors, configure response and send it to the client.
  // But for native errors send only error message and pass control to the logger
  app.use(errorSender);
  app.use(errorLogger);
}

export default applyMiddleware;
