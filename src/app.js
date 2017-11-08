// set up ========================

const { morganConfig } = require('./config');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');

const app = express();
const db = require('./db');

const { authenticationRouter, usersRouter } = require('./users');
const { router: geolocation } = require('./geolocation');
const events = require('./events');

// configuration =================

db.connect();

app.use(morgan(morganConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(passport.initialize());

app.use('/users', usersRouter);
app.use('/authentication', authenticationRouter);
app.use('/geolocation', geolocation);
app.use('/events', events);

module.exports = app;
