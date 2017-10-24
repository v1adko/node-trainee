// set up ========================

let config = require('./config/configuration');
let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan'); 
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let passport = require('passport');

// configuration =================

let db = mongoose.connect(config.connectionDBString, { useMongoClient: true }); 

app.use(morgan(config.envStatus));                        
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                    
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(passport.initialize());


const users = require('./users');

app.use('/users', users);

module.exports = app;

