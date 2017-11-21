import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import passport from 'passport';

import config from './config';
import db from './db';

import applyMiddleware from './middlewares';

import v1routes from './v1/routes';

const app = express();

db.connect();

app.use(morgan(config.morganConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(passport.initialize());

applyMiddleware(app);

app.use('/v1', v1routes);

export default app;
