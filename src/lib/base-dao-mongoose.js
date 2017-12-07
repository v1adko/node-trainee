import { ResourceDuplicateError } from '../lib/errors';

class BaseDaoMongoose {
  constructor(Model) {
    this.Model = Model;
  }

  async create(item) {
    this.checkType(item);
    try {
      return await Promise.resolve(item.save());
    } catch (error) {
      if (error.code === 11000) {
        throw new ResourceDuplicateError();
      }
      throw error;
    }
  }

  async getAll() {
    return Promise.resolve(this.Model.find({}));
  }

  async getById(id) {
    return Promise.resolve(this.Model.findById(id));
  }

  async get(obj) {
    return Promise.resolve(this.Model.find(obj));
  }

  async getOne(obj) {
    return Promise.resolve(this.Model.findOne(obj));
  }

  async updateById(_id, data) {
    return Promise.resolve(this.Model.findOneAndUpdate({ _id }, data));
  }

  async deleteById(_id) {
    return Promise.resolve(this.Model.remove({ _id }));
  }

  checkType(item) {
    if (item instanceof this.Model.prototype.constructor) {
      return true;
    }
    throw new Error('Your item of model does not match with instance');
  }
}

export default BaseDaoMongoose;
