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
  readAll = (request, response) => {
    if (checkPermission(request.user, permissionsConst.READ_USER)) {
      userDao
        .getAll()
        .then(users =>
          response.status(200).json(modelService.mapSafeItems('_id', users))
        );
    }
  };

  readById = (request, response) => {
    if (
      checkPermission(request.user, permissionsConst.READ_USER) ||
      (checkPermission(request.user, permissionsConst.GET_MY_DATE) &&
        request.params.id === request.user.id)
    ) {
      userDao
        .getById(request.params.id)
        .then((user) => {
          if (user) {
            response
              .status(200)
              .json(modelService.getSafeItem(user, user.safeFields));
          }
          throw new Error("User doesn't exist");
        })
        .catch(error => response.status(400).json({ message: error.message }));
    } else {
      response
        .status(400)
        .json({ message: "You don't have permission for this action " });
    }
  };

  readByName = (request, response) => {
    if (checkPermission(request.user, permissionsConst.READ_USER)) {
      userDao
        .get({ username: request.params.name })
        .then(users =>
          response.status(200).json(modelService.mapSafeItems('_id', users))
        )
        .catch(error => response.status(400).json({ message: error.message }));
    }
  };
  create = (request, response) => {
    if (checkPermission(request.user, permissionsConst.CREATE_USER)) {
      const user = new User();
      const { username, password } = request.body;
      user.username = username;
      user.password = password;

      userDao
        .create(user)
        .then(() => {
          response
            .status(200)
            .json(modelService.getSafeItem(user, user.safeFields));
        })
        .catch(() => {
          response.status(400).json({ message: 'User already exist' });
        });
    }
  };

  updateById = (request, response) => {
    if (
      checkPermission(request.user, permissionsConst.UPDATE_USER) ||
      (checkPermission(request.user, permissionsConst.UPDATE_MY_DATE) &&
        request.params.id === request.user.id)
    ) {
      const { username, password } = request.body;

      userDao
        .updateById(request.params.id, { username, password })
        .then(() => {
          response.status(200).json({ message: 'User was udated' });
        })
        .catch((error) => {
          if (error.name === 'CastError') {
            throw new Error("User doesn't exist");
          }
          throw error;
        })
        .catch(error => response.status(400).json({ message: error.message }));
    }
  };

  deleteById = (request, response) => {
    if (checkPermission(request.user, permissionsConst.DELETE_USER)) {
      userDao
        .deleteById(request.params.id)
        .then((user) => {
          if (user.result.n) {
            response.status(200).json({ message: 'User was deleted' });
          }
          throw new Error("User doesn't exist");
        })
        .catch(error => response.status(400).json({ message: error.message }));
    }
  };
}

export default new UserController();
