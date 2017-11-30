import mongoose from 'mongoose';
import { DatabaseWrongIDError } from '../errors/database';

class BaseDaoMongoose {
  constructor(Model) {
    this.Model = Model;
  }

  create(item) {
    this.checkType(item);
    return Promise.resolve(item.save());
  }

  getAll() {
    return Promise.resolve(this.Model.find({}));
  }

  async getById(id) {
    try {
      return await Promise.resolve(this.Model.findById(id));
    } catch (error) {
      if (error instanceof mongoose.CastError && error.kind === 'ObjectId') {
        throw new DatabaseWrongIDError();
      }
      throw error;
    }
  }

  get(obj) {
    return Promise.resolve(this.Model.find(obj));
  }

  getOne(obj) {
    return Promise.resolve(this.Model.findOne(obj));
  }

  updateById(_id, data) {
    return Promise.resolve(this.Model.findOneAndUpdate({ _id }, data));
  }

  deleteById(_id) {
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
