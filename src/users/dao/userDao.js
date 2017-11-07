const BaseDao = require('./baseDaoMongoose');
const User = require('../models/user');

class UserDao extends BaseDao {}

module.exports = new UserDao(User);
