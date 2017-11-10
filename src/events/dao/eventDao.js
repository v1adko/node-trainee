const BaseDao = require('./baseDaoMongoose');
const Event = require('../models/event');
const coordinationsService = require('../services/coordinations');

class EventDao extends BaseDao {
  create(item) {
    this.checkType(item);
    return coordinationsService.set(item)
      .then(chengedItem => super.create(chengedItem));
  }
}

module.exports = new EventDao(Event);
