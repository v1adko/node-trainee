import BaseDao from '../../lib/base-dao-mongoose';
import Atm from './atm-model';

class AtmDao extends BaseDao {}

export default new AtmDao(Atm);
