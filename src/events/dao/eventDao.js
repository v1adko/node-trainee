const BaseDao = require('./baseDaoMongoose');
const Event = require('../models/event');
const coordinatesService = require('../services/coordinatesService');

class EventDao extends BaseDao {
  create(item) {
    this.checkType(item);
    return coordinatesService.set(item)
      .then(chengedItem => super.create(chengedItem));
  }
}

module.exports = new EventDao(Event);
