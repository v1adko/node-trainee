class BaseDaoMongoose {
  constructor(model) {
    this.model = model;
  }

  create(item) {
    this.checkType(item);
    return Promise.resolve(item.save());
  }

  getAll() {
    return Promise.resolve(this.model.find({}));
  }

  getById(id) {
    return Promise.resolve(this.model.getById(id));
  }

  get(obj) {
    return Promise.resolve(this.model.find(obj));
  }

  getOne(obj) {
    return Promise.resolve(this.model.findOne(obj));
  }

  updateById(_id, data) {
    return Promise.resolve(this.model.findOneAndUpdate({ _id }, data));
  }

  deleteById(_id) {
    return Promise.resolve(this.model.remove({ _id }));
  }

  checkType(item) {
    if (item instanceof this.model.prototype.constructor) {
      return true;
    }
    throw new Error('Your item of model does not match with instance');
  }
}

export default BaseDaoMongoose;
