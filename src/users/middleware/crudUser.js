let passport = require('passport');
let mongoose = require('mongoose');

let User = mongoose.model('User')
let baseDao = require('../baseDao');
let Dao = new baseDao(User);


module.exports.getAll = (req, res) => {

  Dao.getAll((err, users) => {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user.getSafeUser();
    });

    res.send(userMap);
  });
};

module.exports.getById = (req, res) => {
  Dao.getById(req.params.id, (err, user) => {
    res.send(user.getSafeUser());
  });
};
