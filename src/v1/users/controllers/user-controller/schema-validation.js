import Joi from 'joi';
import permissions from '../../../../constants/permissions';

const roles = Object.keys(permissions).map(
  permission => permissions[permission].value
);

const idSchema = Joi.string()
  .hex()
  .length(24)
  .required();

const usernameSchema = Joi.string()
  .alphanum()
  .min(6)
  .max(30);

const passwordSchema = Joi.string()
  .alphanum()
  .min(6)
  .max(30);

const roleSchema = Joi.valid(...roles);

const accessTokenSchema = Joi.string().required();

export const readSchema = Joi.object().keys({
  id: idSchema,
  role: roleSchema,
  username: usernameSchema,
  accessToken: accessTokenSchema
});

export const idAndTokenSchema = Joi.object().keys({
  id: idSchema,
  accessToken: accessTokenSchema
});

export const createSchema = Joi.object().keys({
  username: usernameSchema.required(),
  password: passwordSchema.required(),
  role: roleSchema,
  accessToken: accessTokenSchema
});

export const updateByIdSchema = Joi.object()
  .keys({
    id: idSchema,
    username: usernameSchema,
    password: passwordSchema,
    role: roleSchema,
    accessToken: accessTokenSchema
  })
  .or('username', 'password', 'role')
  .with('id', 'accessToken');
