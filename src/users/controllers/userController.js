const { userDao } = require('../dao');
const permissionsConst = require('../config/permissions');
const User = require('../models/user');

function mapUsers(users) {
  const userMap = {};
  users.forEach((user) => {
    userMap[user._id] = user.getSafeUser();
  });
  return userMap;
}

function checkPermission(user, permission) {
  if (user) {
    if (user.permissions) {
      return user.permissions.includes(permission);
    }
    return false;
  }
  throw new Error('User not found. Maybe you forgot doing token verification');
}

const readAll = (req, res) => {
  if (checkPermission(req.user, permissionsConst.READ_USER)) {
    userDao.getAll().then((users) => {
      res.status(200).json(mapUsers(users));
    });
  }
};

const readById = (req, res) => {
  if (checkPermission(req.user, permissionsConst.READ_USER)) {
    userDao
      .getById(req.params.id)
      .then((user) => {
        if (user) {
          res.status(200).json(user.getSafeUser());
        }
        throw new Error("User doesn't exist");
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  }
};

const readByName = (req, res) => {
  if (checkPermission(req.user, permissionsConst.READ_USER)) {
    userDao
      .get({ username: req.params.name })
      .then((users) => {
        res.status(200).json(mapUsers(users));
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  }
};

const create = (req, res) => {
  if (checkPermission(req.user, permissionsConst.CREATE_USER)) {
    const user = new User();
    user.setFields({
      username: req.body.username,
      password: req.body.password
    });

    userDao
      .create(user)
      .then(() => {
        res.status(200).json(user.getSafeUser());
      })
      .catch(() => {
        res.status(400).json({ message: 'User already exist' });
      });
  }
};

const updateById = (req, res) => {
  if (checkPermission(req.user, permissionsConst.UPDATE_USER)) {
    const { username, password } = req.body;

    const changes = new User();
    changes.setFields({ username, password });
    changes._id = req.params.id;

    userDao
      .updateById(req.params.id, changes)
      .then(() => {
        res.status(200).json({ message: 'User was udated' });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          throw new Error("User doesn't exist");
        }
        throw err;
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  }
};

const deleteById = (req, res) => {
  if (checkPermission(req.user, permissionsConst.DELETE_USER)) {
    userDao
      .deleteById(req.params.id)
      .then((user) => {
        if (user.result.n) {
          res.status(200).json({ message: 'User was deleted' });
        }
        throw new Error("User doesn't exist");
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  }
};

module.exports = {
  readAll,
  readById,
  readByName,
  create,
  updateById,
  deleteById
};
