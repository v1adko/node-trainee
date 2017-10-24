let passport = require('passport');
let mongoose = require('mongoose');
let User = mongoose.model('User');

let sendJSONresponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

module.exports.getAll = (req, res) => {

  User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });


    res.send(userMap);
  });

};

module.exports.getById = (req, res) => {

  User.find({
    _id: req.params.id
  }, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.send(userMap);
  });

};

module.exports.getByName = (req, res) => {

  User.find({
    username: req.params.username
  }, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.send(userMap);
  });

};

module.exports.update = (req, res) => {

  User.findOneAndUpdate({
    _id: req.params.id
  }, {}, function(err, users) {

    users.setPassword(req.body.password)

    res.send('ok');
  });

};