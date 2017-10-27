const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const sendJSONresponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

module.exports.register = (req, res) => {
  if (!req.body.username || !req.body.password) {
    sendJSONresponse(res, 400, {
      message: 'All fields required'
    });
    return;
  }

  const user = new User();

  user.username = req.body.username;
  user.setPassword(req.body.password);

  user.save((err) => {
    if (err) {
      sendJSONresponse(res, 400, {
        message: 'User already exist'
      });
      return;
    }
    const token = user.generateJwt();
    res.status(200);
    res.json({ token });
  });
};

module.exports.login = (req, res) => {
  if (!req.body.username || !req.body.password) {
    sendJSONresponse(res, 400, {
      message: 'All fields required'
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

module.exports.logout = (req, res) => {
  req.logout();
  res.status(200);
  res.send('ok');
};
