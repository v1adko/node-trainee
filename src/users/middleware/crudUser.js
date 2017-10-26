let passport = require('passport');
let mongoose = require('mongoose');

let User = mongoose.model('User')
let Dao = require('../dao');
let dao = new Dao(User);

module.exports.getAll = (req, res) => {

  dao.getAll()
    .then((users) => {
      var userMap = {};

      users.forEach(function(user) {
        userMap[user._id] = user.getSafeUser();
      });

      res.send(userMap);
    });
};

module.exports.getById = (req, res) => {
  dao.getById(req.params.id)
    .then((user) => {
      res.send(user.getSafeUser());
    });
};