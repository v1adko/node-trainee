import mongoose from 'mongoose';
import {
  DatabaseWrongIDError,
  ResourceDoesNotExistAnymore,
  ResourceDuplicateError
} from '../errors/database';

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
    try {
      const item = await Promise.resolve(this.Model.findById(id));
      if (!item) {
        throw new ResourceDoesNotExistAnymore();
      }
      return item;
    } catch (error) {
      if (error instanceof mongoose.CastError && error.kind === 'ObjectId') {
        throw new DatabaseWrongIDError();
      }
      throw error;
    }
  }

  async get(obj) {
    return Promise.resolve(this.Model.find(obj));
  }

  async getOne(obj) {
    return Promise.resolve(this.Model.findOne(obj));
  }

  async updateById(_id, data) {
    try {
      return await Promise.resolve(this.Model.findOneAndUpdate({ _id }, data));
    } catch (error) {
      if (error instanceof mongoose.CastError && error.kind === 'ObjectId') {
        throw new DatabaseWrongIDError();
      }
      throw error;
    }
  }

  async deleteById(_id) {
    try {
      const item = await Promise.resolve(this.Model.remove({ _id }));
      if (!item.result.n) {
        throw new ResourceDoesNotExistAnymore();
      }
    } catch (error) {
      if (error instanceof mongoose.CastError && error.kind === 'ObjectId') {
        throw new DatabaseWrongIDError();
      }
      throw error;
    }
  }

  checkType(item) {
    if (item instanceof this.Model.prototype.constructor) {
      return true;
    }
    throw new Error('Your item of model does not match with instance');
  }
}

export default BaseDaoMongoose;
