const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports.getAll = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.send(err);
    }
    const userMap = {};

    users.forEach((user) => {
      userMap[user.id] = user;
    });

    return res.send(userMap);
  });
};

module.exports.getById = (req, res) => {
  User.find({
    _id: req.params.id
  }, (err, users) => {
    if (err) {
      return res.send(err);
    }
    const userMap = {};

    users.forEach((user) => {
      userMap[user.id] = user;
    });

    return res.send(userMap);
  });
};

module.exports.getByName = (req, res) => {
  User.find({
    username: req.params.username
  }, (err, users) => {
    if (err) {
      return res.send(err);
    }
    const userMap = {};

    users.forEach((user) => {
      userMap[user.id] = user;
    });

    return res.send(userMap);
  });
};

module.exports.update = (req, res) => {
  User.findOneAndUpdate({
    _id: req.params.id
  }, {}, (err, users) => {
    if (err) {
      return res.send(err);
    }
    users.setPassword(req.body.password);
    return res.send('ok');
  });
};
