import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import passport from 'passport';

import config from './config';
import db from './db';

import { jwtValidator, permissionsValidator } from './validators';
import permissions from './config/permissions';

import { geolocationRouter } from './geolocation';
import eventsRouter from './events';
import { authenticationRouter, usersRouter } from './users';

const app = express();

db.connect();

app.use(morgan(config.morganConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(passport.initialize());

app.use(
  '/users',
  jwtValidator,
  permissionsValidator(permissions.ADMIN),
  usersRouter
); // admin
app.use('/authentication', authenticationRouter); // public
app.use(
  '/geolocation',
  jwtValidator,
  permissionsValidator(permissions.USER),
  geolocationRouter
); // user
app.use(
  '/events',
  jwtValidator,
  permissionsValidator(permissions.USER),
  eventsRouter
); // user

export default app;
