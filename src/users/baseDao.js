'use strict;';

let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let secret = require('./config/jwt').secretTokkenWord;

class baseDaoMongoose {
    constructor(model) {
        this.model = model;
    }

    create(items, callback) {
        items.save(callback);
    }

    getAll(callback) {
        this.model.find({}, callback);
    }

    getById(id, callback) {
        this.model.find({
            _id: id
        }, function(err, user) {
            callback(err, user[0]);
        })
    }

    updateById(id, data, callback) {
        this.model.findOneAndUpdate({
            _id: id
        }, data, callback);
    }

    removeById(id, callback) {
        this.model.remove({
            _id: id
        }, function(err) {
            callback(err);
        });
    }
}


module.exports = baseDaoMongoose;