import Joi from 'joi';
import permissions from '../../../../constants/permissions';

const roles = Object.keys(permissions).map(
  permission => permissions[permission].value
);

const usernameSchema = Joi.string()
  .alphanum()
  .min(6)
  .max(30);

const passwordSchema = Joi.string()
  .alphanum()
  .min(6)
  .max(30);

const roleSchema = Joi.valid(...roles);

export const createSchema = Joi.object().keys({
  username: usernameSchema.required(),
  password: passwordSchema.required(),
  role: roleSchema
});

export const updateByIdSchema = Joi.object()
  .keys({
    username: usernameSchema,
    password: passwordSchema,
    role: roleSchema
  })
  .or('username', 'password', 'role');
