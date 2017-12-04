import Joi from 'joi';

const idSchema = Joi.string().hex();
const passwordSchema = Joi.string()
  .alphanum()
  .min(6)
  .max(30)
  .required();

const changePasswordSchema = Joi.object().keys({
  id: idSchema,
  password: passwordSchema,
  newPassword: passwordSchema
});

export default changePasswordSchema;
