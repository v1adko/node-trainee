// set up ========================

const config = require('./config/configuration');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');

const app = express();

// configuration =================

mongoose.connect(config.connectionDBString, { useMongoClient: true });

app.use(morgan(config.envStatus));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(passport.initialize());

const users = require('./users');

app.use('/users', users);

module.exports = app;
