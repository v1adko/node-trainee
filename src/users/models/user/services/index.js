const jwt = require('./jwt');
const password = require('./password');
const user = require('./user');

let userMethods = {};

userMethods = {
  ...jwt, ...password, ...user
};

module.exports = userMethods;
