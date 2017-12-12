import Joi from 'joi';

const addressSchema = Joi.string()
  .min(1)
  .max(300)
  .required();
const accessTokenSchema = Joi.string();

export const tokenOnlySchema = Joi.object().keys({
  accessToken: accessTokenSchema
});

export const createEventSchema = Joi.object().keys({
  accessToken: accessTokenSchema,
  address: addressSchema
});
