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
    return Promise.resolve(this.model.findOne({ _id: id }));
  }

  get(obj) {
    return Promise.resolve(this.model.find(obj));
  }

  getOne(obj) {
    return Promise.resolve(this.model.findOne(obj));
  }

  updateById(id, data) {
    return Promise.resolve(this.model.findOneAndUpdate({ _id: id }, data));
  }

  deleteById(id) {
    return Promise.resolve(this.model.remove({ _id: id }));
  }
}

module.exports = BaseDaoMongoose;
