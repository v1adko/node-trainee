import { ResourceDuplicateError, NotFoundError } from '../lib/errors';

const getRequredFieldFromWriteError = error =>
  error.message.match(/ index:.(.*)_/)[1];
class BaseDaoMongoose {
  constructor(model) {
    this.model = model;
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
    return Promise.resolve(this.model.find({}));
  }

  async getById(id) {
    const item = await Promise.resolve(this.model.findById(id));
    if (!item) {
      throw new NotFoundError("User doesn't exist.");
    }
    return item;
  }

  async get(characteristicFields) {
    return Promise.resolve(this.model.find(characteristicFields));
  }

  async getOne(characteristicFields) {
    return Promise.resolve(this.model.findOne(characteristicFields));
  }

  async updateById(_id, data) {
    const item = await Promise.resolve(
      this.model.findOneAndUpdate({ _id }, data)
    );
    if (!item) {
      throw new NotFoundError("User doesn't exist.");
    }
    return item;
  }

  async deleteById(_id) {
    return Promise.resolve(this.model.remove({ _id }));
  }

  async delete(characteristicFields) {
    return Promise.resolve(this.model.remove(characteristicFields));
  }

  async deleteAll() {
    return Promise.resolve(this.model.remove({}));
  }

  checkType(item) {
    if (item instanceof this.model.prototype.constructor) {
      return true;
    }
    throw new Error('Your item of model does not match with instance');
  }
}

export default BaseDaoMongoose;
