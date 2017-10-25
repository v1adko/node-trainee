let passport = require('passport');
let mongoose = require('mongoose');
// let User = mongoose.model('User');

let User = mongoose.model('User')
let baseDao = require('../baseDao');
let Dao = new baseDao(User);



module.exports.register = (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      "message": "All fields required"
    });
    return;
  }

  const user = new User();

  user.username = req.body.username;
  user.setPassword(req.body.password);

  Dao.create(user, (err) => {
    if (err) {
      res.status(400).json({
        "message": "User already exist"
      });
      return;
    }
    let token = user.generateJwt();
    res.status(200).json({
      "token": token
    });
  });
};

module.exports.login = (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      "message": "All fields required"
    });
    return;
  }

  passport.authenticate('local', (err, user, info) => {
    let token;

    if (err) {
      res.status(404).json(err);
      return;
    }

    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({ token });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports.isLogined = (req, res) => {

  var token = req.body.token || req.headers['x-access-token'];

  if (token) {
    User.verifyJwt(token, (status) => res.json(status))
  } else {
    res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }

}

module.exports.changePassword = (req, res) => {
  Dao.getById(req.params.id, (err, user) => {

    if (user.validPassword(req.body.password)) {
      user.setPassword(req.body.newPassword);

      Dao.updateById(req.params.id, user, (err, user) => {
        let token = user.generateJwt();
        return res.status(200).json({
          "token": token
        });
      });
    } else {
      return res.json({
        message: 'Password is wrong'
      });
    }

  })
};
