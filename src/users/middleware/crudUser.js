let passport = require('passport');
let mongoose = require('mongoose');

let User = require('../models/user')
let Dao = require('../dao');
let dao = new Dao(User);

function mapUsers(users) {
  var userMap = {};
  users.forEach(function(user) {
    userMap[user._id] = user.getSafeUser();
  });
  return userMap;
}

module.exports.getAll = (req, res) => {

  dao.getAll()
    .then((users) => {
      res.send(mapUsers(users));
    });
};

module.exports.getById = (req, res) => {
  dao.getById(req.params.id)
    .then((user) => {
      res.send(user.getSafeUser());
    });
};

module.exports.getByName = (req, res) => {
  dao.get({
      username: req.params.name
    })
    .then((users) => {
      res.send(mapUsers(users));
    });
};