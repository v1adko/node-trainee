import { ResourceDuplicateError, NotFoundError } from '../lib/errors';

const getRequredFieldFromWriteError = error =>
  error.message.match(/ index:.(.*)_/)[1];
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
        const field = getRequredFieldFromWriteError(error);
        throw new ResourceDuplicateError(field);
      }
      throw error;
    }
  }

  async getAll() {
    return Promise.resolve(this.Model.find({}));
  }

  async getById(id) {
    const item = await Promise.resolve(this.Model.findById(id));
    if (!item) {
      throw new NotFoundError("Item doesn't exist.");
    }
    return item;
  }

  async get(obj) {
    return Promise.resolve(this.Model.find(obj));
  }

  async getOne(obj) {
    return Promise.resolve(this.Model.findOne(obj));
  }

  async updateById(_id, data) {
    const item = await Promise.resolve(
      this.Model.findOneAndUpdate({ _id }, data)
    );
    if (!item) {
      throw new NotFoundError("Item doesn't exist.");
    }
    return item;
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
