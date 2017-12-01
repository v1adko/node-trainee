import Joi from 'joi';

const passwordSchema = Joi.string()
  .alphanum()
  .min(6)
  .max(30)
  .required();

const changePasswordSchema = Joi.object().keys({
  password: passwordSchema,
  newPassword: passwordSchema
});

export default changePasswordSchema;
