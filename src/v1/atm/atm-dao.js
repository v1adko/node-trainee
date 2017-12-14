import BaseDao from '../../lib/base-dao-mongoose';
import Atm from './atm-model';

class AtmDao extends BaseDao {
  async findInArea(latitude, longitude, radius) {
    return Promise.resolve(
      this.Model.find({
        latitude: { $gt: latitude - radius, $lt: latitude + radius },
        longitude: { $gt: longitude - radius, $lt: longitude + radius }
      })
    );
  }
}

export default new AtmDao(Atm);
