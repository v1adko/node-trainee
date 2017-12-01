import BaseDao from '../../lib/base-dao-mongoose';
import Event from './event-model';
import coordinatesService from './coordinates-service';

class EventDao extends BaseDao {
  create(item) {
    this.checkType(item);
    return coordinatesService
      .set(item)
      .then(changedItem => super.create(changedItem));
  }
}

export default new EventDao(Event);
