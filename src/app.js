import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import passport from 'passport';

import config from './config';
import db from './db';

import applyMiddleware from './middlewares';

import { geolocationRouter } from './geolocation';
import eventsRouter from './events';
import { authenticationRouter, usersRouter, userProfileRouter } from './users';

const app = express();

db.connect();

app.use(morgan(config.morganConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(passport.initialize());

applyMiddleware(app);

app.use('/authentication', authenticationRouter);
app.use('/myprofile', userProfileRouter);
app.use('/geolocation', geolocationRouter);
app.use('/events', eventsRouter);
app.use('/users', usersRouter);

export default app;
