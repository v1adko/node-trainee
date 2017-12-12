import Joi from 'joi';

const accessTokenSchema = Joi.string().required();
const passwordSchema = Joi.string()
  .alphanum()
  .min(6)
  .max(30)
  .required();

export const changePasswordSchema = Joi.object().keys({
  accessToken: accessTokenSchema,
  password: passwordSchema,
  newPassword: passwordSchema
});

export const readMyProfileSchema = Joi.object().keys({
  accessToken: accessTokenSchema
});
