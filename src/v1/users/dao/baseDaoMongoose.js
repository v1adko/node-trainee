class BaseDaoMongoose {
  constructor(model) {
    this.model = model;
  }

  create(item) {
    if (item instanceof this.model.prototype.constructor) {
      return Promise.resolve(item.save());
    }
    throw new Error('Your item of model does not match with instance');
  }

  getAll() {
    return Promise.resolve(this.model.find({}));
  }

  getById(id) {
    return Promise.resolve(this.model.findById(id));
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
}

export default BaseDaoMongoose;
