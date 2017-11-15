import BaseDao from './baseDaoMongoose';
import Event from '../models/event';
import coordinatesService from '../services/coordinatesService';

class EventDao extends BaseDao {
  create(item) {
    this.checkType(item);
    return coordinatesService
      .set(item)
      .then(chengedItem => super.create(chengedItem));
  }
}

export default new EventDao(Event);
