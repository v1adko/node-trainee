import Joi from 'joi';

const addressSchema = Joi.string()
  .min(1)
  .max(300)
  .required();

const coordinatesSchema = Joi.number();

const accessTokenSchema = Joi.string().required();

export const addressToCoordinatesSchema = Joi.object().keys({
  accessToken: accessTokenSchema,
  address: addressSchema
});

export const coordinatesToAddressSchema = Joi.object().keys({
  accessToken: accessTokenSchema,
  lat: coordinatesSchema,
  lon: coordinatesSchema
});
