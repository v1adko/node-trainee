const passport = require('passport');

const User = require('../models/user');
const Dao = require('../dao');

const dao = new Dao(User);

module.exports.register = (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      message: 'All fields required'
    });
    return;
  }

  const user = new User();

  user.username = req.body.username;
  user.setPassword(req.body.password);

  Dao.create(user)
    .then(() => {
      const token = user.generateJwt();
      res.status(200).json({
        token
      });
    })
    .catch(() => {
      res.status(400).json({
        message: 'User already exist'
      });
    });
};

module.exports.login = (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      message: 'All fields required'
    });
    return;
  }

  passport.authenticate('local', (err, user, info) => {

    consoel.log('====login:', err, user, info);
    
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
  const token = req.body.token || req.headers['x-access-token'];

  if (token) {
    User.verifyJwt(token, status => res.json(status));
  } else {
    res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};

module.exports.changePassword = (req, res) => {
  dao.getById(req.params.id)
    .then((user) => {
      if (user.validPassword(req.body.password)) {
        user.setPassword(req.body.newPassword);
        return user;
      }
      return res.json({
        message: 'Password is wrong'
      });
    })
    .catch(() => res.json({
      message: 'Password is wrong'
    }))
    .then(user => dao.updateById(req.params.id, user))
    .then((user) => {
      const token = user.generateJwt();
      return res.status(200).json({
        token
      });
    })
    .catch(() => {
      res.status(400).json({
        message: "Can't change password"
      });
    });
};
