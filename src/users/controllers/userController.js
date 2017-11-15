import { userDao } from '../dao';
import permissionsConst from '../config/permissions';
import User from '../models/user';
import { modelService } from '../services/';

function checkPermission(user, permission) {
  if (user) {
    if (user.permissions) {
      return user.permissions.includes(permission);
    }
    return false;
  }
  throw new Error('User not found. Maybe you forgot doing token verification');
}

class UserController {
  readAll = (req, res) => {
    if (checkPermission(req.user, permissionsConst.READ_USER)) {
      userDao
        .getAll()
        .then(users =>
          res.status(200).json(modelService.mapSafeItems('_id', users))
        );
    }
  };

  readById = (req, res) => {
    if (
      checkPermission(req.user, permissionsConst.READ_USER) ||
      (checkPermission(req.user, permissionsConst.GET_MY_DATE) &&
        req.params.id === req.user.id)
    ) {
      userDao
        .getById(req.params.id)
        .then((user) => {
          if (user) {
            res
              .status(200)
              .json(modelService.getSafeItem(user, user.safeFields));
          }
          throw new Error("User doesn't exist");
        })
        .catch(err => res.status(400).json({ message: err.message }));
    } else {
      res
        .status(400)
        .json({ message: "You don't have permission for this action " });
    }
  };

  readByName = (req, res) => {
    if (checkPermission(req.user, permissionsConst.READ_USER)) {
      userDao
        .get({ username: req.params.name })
        .then(users =>
          res.status(200).json(modelService.mapSafeItems('_id', users))
        )
        .catch(err => res.status(400).json({ message: err.message }));
    }
  };
  create = (req, res) => {
    if (checkPermission(req.user, permissionsConst.CREATE_USER)) {
      const user = new User();
      user.setFields({
        username: req.body.username,
        password: req.body.password
      });

      userDao
        .create(user)
        .then(() => {
          res.status(200).json(modelService.getSafeItem(user, user.safeFields));
        })
        .catch(() => {
          res.status(400).json({ message: 'User already exist' });
        });
    }
  };

  updateById = (req, res) => {
    if (
      checkPermission(req.user, permissionsConst.UPDATE_USER) ||
      (checkPermission(req.user, permissionsConst.UPDATE_MY_DATE) &&
        req.params.id === req.user.id)
    ) {
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
        .catch(err => res.status(400).json({ message: err.message }));
    }
  };

  deleteById = (req, res) => {
    if (checkPermission(req.user, permissionsConst.DELETE_USER)) {
      userDao
        .deleteById(req.params.id)
        .then((user) => {
          if (user.result.n) {
            res.status(200).json({ message: 'User was deleted' });
          }
          throw new Error("User doesn't exist");
        })
        .catch(err => res.status(400).json({ message: err.message }));
    }
  };
}

export default new UserController();
