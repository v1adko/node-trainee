// set up ========================

import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import passport from 'passport';

import config from './config';
import db from './db';
import { router as geolocationRouter } from './geolocation';
import { router as eventsRouter } from './events';

const { authenticationRouter, usersRouter } = require('./users');

// configuration =================

const app = express();

db.connect();

app.use(morgan(config.morganConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(passport.initialize());

app.use('/users', usersRouter);
app.use('/authentication', authenticationRouter);
app.use('/geolocation', geolocationRouter);
app.use('/events', eventsRouter);

export default app;
