import BaseDao from './baseDaoMongoose';
import User from '../models/user';

class UserDao extends BaseDao {}

export default new UserDao(User);
