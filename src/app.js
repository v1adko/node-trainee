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

const userPermissionCheck = [
  jwtValidator,
  permissionsValidator(permissions.USER)
];
const adminPermissionCheck = [
  jwtValidator,
  permissionsValidator(permissions.ADMIN)
];

app.use('/authentication', authenticationRouter);
app.use('/geolocation', ...userPermissionCheck, geolocationRouter);
app.use('/events', ...userPermissionCheck, eventsRouter);
app.use('/users', ...adminPermissionCheck, usersRouter);

export default app;
