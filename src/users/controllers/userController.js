const { userDao } = require('../dao');
const permissionsConst = require('../config/permissions');
const User = require('../models/user');

function mapUsers(users) {
  const userMap = {};
<<<<<<< 2981ca1e59a492f1068964fab3d0a04c87d2ba4c
  users.forEach((user) => {
    userMap[user._id] = user.getSafeUser();
  });
=======
  users.forEach((user) => { userMap[user._id] = user.do.getSafeUser(); });
>>>>>>> Rewrite services as a classes
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
  if (checkPermission(req.user, permissionsConst.READ_USER)
  || (checkPermission(req.user, permissionsConst.GET_MY_DATE) && req.params.id === req.user.id)) {
    userDao.getById(req.params.id)
      .then((user) => {
        if (user) {
<<<<<<< 2981ca1e59a492f1068964fab3d0a04c87d2ba4c
          res.status(200).json(user.getSafeUser());
        }
        throw new Error("User doesn't exist");
=======
          res.status(200).json(user.do.getSafeUser());
        } throw new Error("User doesn't exist");
>>>>>>> Rewrite services as a classes
      })
      .catch((err) => { res.status(400).json({ message: err.message }); });
  } else { res.status(400).json({ message: "You don't have permission for this action " }); }
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
  if (checkPermission(req.user, permissionsConst.UPDATE_USER)
  || (checkPermission(req.user, permissionsConst.UPDATE_MY_DATE)
      && req.params.id === req.user.id)) {
    const { username, password } = req.body;

    const changes = new User();
    changes.do.setFields({ username, password });
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
