import Joi from 'joi';

const idSchema = Joi.string().hex();
const usernameSchema = Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required();
const passwordSchema = Joi.string()
  .alphanum()
  .min(6)
  .max(30)
  .required();

const authenticationSchema = Joi.object().keys({
  id: idSchema,
  username: usernameSchema,
  password: passwordSchema
});

export default authenticationSchema;
